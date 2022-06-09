import torch
import pandas as pd
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler
from transformers import CamembertForSequenceClassification, CamembertTokenizer, AdamW

# camembert = torch.hub.load('pytorch/fairseq', 'camembert.v0')

# DATA_PATH = Path('./data/')
# LOG_PATH = Path('./logs/')
# MODEL_PATH = Path('./model/')
# LABEL_PATH = Path('./labels/')

# df = pd.read_csv('./data/labeled_data.csv')

# val_set = df.sample(frac=0.2, replace=False, random_state=42)
# train_set = df.drop(index=val_set.index)
# print(f"Nb element dans val_set : {len(val_set)}")
# print(f"Nb element dans train_ser: {len(train_set)}")
# val_set.to_csv('./data/val_set.csv')
# train_set.to_csv('./data/train_set.csv')

# labels = df.columns[1:].to_list()
# with open('./labels/label.txt', 'w') as f:
#     for i in labels:
#         f.write(f"{i}\n")

# df_texts = pd.read_csv('./data/raw_data.csv')
# all_text = df_texts['caption'].to_list()
# print(all_text)
dataset = pd.read_csv('labeled_data_2_feelings.csv')
all_text = dataset['text'].values.tolist()
sentiments = dataset['aggressif'].values.tolist()
# print(sentiments)
TOKENIZER = CamembertTokenizer.from_pretrained(
    'camembert-base',
    do_lower_case=True)

def preprocess(raw_reviews, sentiments=None):
    encoded_batch = TOKENIZER.batch_encode_plus(raw_reviews,
                                                truncation=True,
                                                pad_to_max_length=True,
                                                return_attention_mask=True,
                                                return_tensors = 'pt')
    if sentiments:
        sentiments = torch.tensor(sentiments)
        return encoded_batch['input_ids'], encoded_batch['attention_mask'], sentiments
    return encoded_batch['input_ids'], encoded_batch['attention_mask']


encoded_batch = TOKENIZER.batch_encode_plus(all_text,
                                            add_special_tokens=True,
                                            padding=True,
                                            truncation=True,
                                            return_attention_mask = True,
                                            return_tensors = 'pt')
sentiments = torch.tensor(sentiments)
print(sentiments)
split_border = int(len(sentiments) * 0.8)
train_dataset = TensorDataset(
    encoded_batch['input_ids'][:split_border],
    encoded_batch['attention_mask'][:split_border],
    sentiments[:split_border])
validation_dataset = TensorDataset(
    encoded_batch['input_ids'][split_border:],
    encoded_batch['attention_mask'][split_border:],
    sentiments[split_border:])
train_dataloader = DataLoader(
            train_dataset,
            sampler = RandomSampler(train_dataset),
            batch_size = 32)
 
validation_dataloader = DataLoader(
            validation_dataset,
            sampler = SequentialSampler(validation_dataset),
            batch_size = 32)

model = CamembertForSequenceClassification.from_pretrained(
    'camembert-base',
    num_labels = 2)

optimizer = AdamW(model.parameters(),
                  lr = 2e-5,
                  eps = 1e-8)
epochs = 30

device = torch.device("cpu")
training_stats = []
for epoch in range(0, epochs):
     
    print("")
    print(f'########## Epoch {epoch+1} / {epochs} ##########')
    print('Training...')
    total_train_loss = 0
    model.train()
    for step, batch in enumerate(train_dataloader):
        if step % 40 == 0 and not step == 0:
            print(f'  Batch {step}  of {len(train_dataloader)}.')
        input_id = batch[0].to(device)
        attention_mask = batch[1].to(device)
        sentiment = batch[2].to(device)
        model.zero_grad()        
        ppp = model(input_id, 
                             token_type_ids=None, 
                             attention_mask=attention_mask, 
                             labels=sentiment)
        total_train_loss += ppp.loss.item()
        ppp.loss.backward()
        optimizer.step()
    avg_train_loss = total_train_loss / len(train_dataloader)   
    print("")
    print("  Average training loss: {0:.2f}".format(avg_train_loss))  
    training_stats.append(
        {
            'epoch': epoch + 1,
            'Training Loss': avg_train_loss,
        }
    )
 
print("Model saved!")
torch.save(model.state_dict(), "./sentiments.pt")
print(type(model))
with torch.no_grad():
    model.eval()
    input_ids, attention_mask = preprocess(["Je vais attaquer l’ennemi", "Je vais jouer avec le chat", "Qu’allons nous faire ?", "Où allons-nous ?", "Je rammasse l’arme par terre", "Demandons l’avis a ce passant", "Continuons dans cette direction", "Il doit y avoir quelque chose dans ces buissons", "Je l’emmerde", "Que voulez-vous faire ?", "Je lance une boule de feu", "J’esquive", "Je lance un sort de soin", "Je lance un sort de zone", "Je poursuit le cheval", "Je demande où se trouve la taverne", "Je bois cul-sec la choppe de bière", "Je l’assome et décide d’avancer", "Je prend la fuite", "Je suis l’équipe", "Faisons un camp", "Je garde le camp", "J’ai peur", "je fonce dans le tas"])
    retour = model(input_ids, attention_mask=attention_mask)
        
    print(torch.argmax(retour[0], dim=1))