import json

with open("CROSSWD.TXT", "r") as f:
    words = f.read().strip().split("\n")

with open("CRSWD-D.TXT", "r") as f:
    words = words + f.read().strip().split("\n")

words = [word for word in words if len(word) >= 3]

words.sort()
print(len(words))

with open("words.json", "w") as f:
    json.dump(words, f)