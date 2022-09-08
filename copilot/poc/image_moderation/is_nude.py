'''
    Classify nudity image script.
    Obviously i won't provide test file.
    Credits to: https://github.com/hhatto/nude.py

USAGE: .
    python nudepy IMAGE_FILE
'''

# from __future__ import print_function
import gradio as gr
# import os
from nude import Nude
from PIL import Image


# IMAGE_ROOT = ROOT = os.path.dirname(os.path.abspath(__file__)) + '/images/'
# for file_name in os.listdir(IMAGE_ROOT):
#     file_path = os.path.join(IMAGE_ROOT, file_name)
#     if os.path.isdir(file_path):
#         continue
#     n = Nude(file_path)
#     n.parse()
#     print(f"---------\nImage: {file_path}:\nis it nude: {n.result}\nmessage: {n.message}")

def classify_image(img):
    im = Image.fromarray(img)
    im.save('test.jpg')
    n = Nude("test.jpg")
    n.parse()
    return(f"is it nude: {n.result}\nnote: {n.message}")

demo = gr.Interface(fn=classify_image, 
             inputs="image",
             outputs="text",
            examples=[
                "./images/1.jpg", "./images/2.jpg", "./images/3.jpg",
                "./images/4.jpg", "./images/5.jpg", "./images/6.jpg",
                "./images/7.jpg", "./images/8.jpg", "./images/9.jpg",
                "./images/10.jpg", "./images/11.jpg", "./images/12.jpg",
                "./images/13.jpg", "./images/14.jpg", "./images/15.jpg",
                "./images/16.jpg", "./images/17.jpg", "./images/18.jpg",
                "./images/19.jpg", "./images/20.jpg"
            ])


demo.launch(share=True)