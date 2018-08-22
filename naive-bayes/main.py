import numpy as np

def main():
    # We have the given input X and y
    # X is a matrix of words and y is the label that indicates if the sentence
    # is abusive or not
    # We want to find the probability if a sentence is abusive or not
    # P(Sentence|Abusive) = P(Abusive|Sentence) * P(Abusive) / P(Sentence)
    # We do not need to take the denominator into account (P(Sentence)), since
    # comparing the numerator will do
    X = [['my', 'dog', 'has', 'flea', 'problems', 'help', 'please'],
            ['maybe', 'not', 'take', 'him', 'to', 'dog', 'park', 'stupid'],
            ['my', 'dalmation', 'is', 'so', 'cute', 'I', 'love', 'him'],
            ['stop', 'posting', 'stupid', 'worthless', 'garbage'],
            ['mr', 'licks', 'ate', 'my', 'steak', 'how', 'to', 'stop', 'him'],
            ['quit', 'buying', 'worthless', 'dog', 'food', 'stupid']]

    y = [0, 1, 0, 1, 0, 1] # 1 is abusive, 0 is not

    label = ['not-abusive', 'abusive']
    vocab_list = create_vocab_list(X)
    print('vocab_list', vocab_list)
    train_matrix = []
    for sentence in X:
        train_matrix.append(set_of_words_to_vec(vocab_list, sentence))
    print('train_matrix', train_matrix)

    p0_vec, p1_vec, p_abusive = train_naive_bayes(train_matrix, y)
    print('nb', p0_vec, p1_vec, p_abusive)

    X_test = ['I love my dalmatian', 'stupid garbage']
    for X in X_test:
        X_parsed = np.array(set_of_words_to_vec(vocab_list, X.split(' ')))
        result = classify_naive_bayes(X_parsed, p0_vec, p1_vec, p_abusive)
        print('classification result for {}: {}'.format(X, label[result]))

# Creates a unique set of features
def create_vocab_list(dataset):
    vocabs = set()
    for row in dataset:
        vocabs |= set(row)
    return list(vocabs)

# Convert the input to be equal to the length of features available, but only
# those that are available are marked
def set_of_words_to_vec(vocabs, input):
    result = [0] * len(vocabs)
    for word in input:
        if word in vocabs:
            result[vocabs.index(word)] = 1
    return result

# Create the basic probability for each classes
def train_naive_bayes(X_train, y_train):
    num_data = len(X_train)
    num_feat = len(X_train[0])

    # P(Abusive) is easy to calculate, just find the number of occuring times
    # that the labels are abusive out of the total times
    # P(Not Abusive) = 1 - P(Abusive)
    prob_abusive = sum(y_train) / num_data

    # To find the P(Abusive|Sentence), we calculate the probability of each
    # word being abusive
    p0_num = np.ones(num_feat)
    p1_num = np.ones(num_feat)
    p0_denum = 2.0
    p1_denum = 2.0
    for i in range(num_data):
        if y_train[i] == 1:
            p1_num += X_train[i]
            p1_denum += sum(X_train[i])
        else:
            p0_num += X_train[i]
            p0_denum += sum(X_train[i])
    p0_vec = np.log(p0_num / p0_denum)
    p1_vec = np.log(p1_num / p1_denum)
    return p0_vec, p1_vec, prob_abusive

def classify_naive_bayes(vec2_classify, p0_vec, p1_vec, p_class1):
    p1 = sum(vec2_classify * p1_vec) + np.log(p_class1)
    p0 = sum(vec2_classify * p0_vec) + np.log(1 - p_class1)
    return 1 if p1 > p0 else 0

main()

