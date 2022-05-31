import imp


#!/bin/python3
import torch
import torch.nn as nn
from transformers import CamembertTokenizer, CamembertForSequenceClassification

class TempModel(nn.Module):
    def __init__(self):
        self.conv1 = nn.Conv2d(3, 5, (3, 3))
    def forward(self, inp):
        return self.conv1(inp)

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

# model = TempModel()
m = torch.load('sentiments.pt')
model = CamembertForSequenceClassification.from_pretrained('./sentiment.pt')
print(model)
# model = torch.load('')
with torch.no_grad():
    model.eval()
    input_ids, attention_mask = preprocess(["Je vais attaquer l’ennemi", "Je vais jouer avec le chat", "Qu’allons nous faire ?", "Où allons-nous ?", "Je rammasse l’arme par terre", "Demandons l’avis a ce passant", "Continuons dans cette direction", "Il doit y avoir quelque chose dans ces buissons", "Je l’emmerde", "Que voulez-vous faire ?", "Je lance une boule de feu", "J’esquive", "Je lance un sort de soin", "Je lance un sort de zone", "Je poursuit le cheval", "Je demande où se trouve la taverne", "Je bois cul-sec la choppe de bière", "Je l’assome et décide d’avancer", "Je prend la fuite", "Je suis l’équipe", "Faisons un camp", "Je garde le camp", "J’ai peur", "je fonce dans le tas"])
    retour = model(input_ids, attention_mask=attention_mask)

    print(torch.argmax(retour[0], dim=1))