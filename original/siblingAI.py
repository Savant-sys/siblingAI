import json
from difflib import get_close_matches #so the chatbot give give best response

#load the Brain into the program 
def loadBrain(filePath: str) -> dict:
    with open(filePath, 'r') as file:
        data: dict = json.load(file)
    return data

#save the dictionary to the barin.json so we dont loose previousely ran data
def memory(filePath: str, data: dict):
    with open(filePath, 'w') as file:
        json.dump(data, file, indent = 2)

#find the best answer from the disctionary for the users question 
def findOptimumResponse(client: str, listOfQuestions: list[str]) -> str | None: #return either a string or none bc it might not be in the json file
    bestMatch: list = get_close_matches(client, listOfQuestions, n = 1, cutoff=0.6)# n = 1 means the top answer is returned with a 60% accuracy(this is the default percentage)
    return bestMatch[0] if bestMatch else None

# function to return the answer
def fetchResponse(client: str, brain: dict) -> str | None:
    for question in brain["question"]:
        if question["question"] == client:
            return question["answer"]



def sibling():
    brain: dict = loadBrain('brain.json')
    
    while True:
        clientInput: str = input('You: ')
        if clientInput.lower() == 'exit':
            break
        
        #search for the best match in our json. return none if nothing found 
        optimalMatch: str | None = findOptimumResponse(clientInput, [questions["question"]for questions in brain["question"]])
        
        if optimalMatch:
            siblingResponse: str = fetchResponse(optimalMatch, brain)
            print(f'Sibling: {siblingResponse}')
        else:
            print('Sibling: Im not sure how to answer can you teach me?')
            newResponse: str = input('Type to teach your Sibling or you can "skip" to skip ')
            
            if newResponse.lower() != 'skip':
                brain["question"].append({"question": clientInput, "answer": newResponse})
                memory('brain.json', brain)
                print('Siblin: Thanks for teaching me a new response!')

if __name__ == '__main__':
    sibling()