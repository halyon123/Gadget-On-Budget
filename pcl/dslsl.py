import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# Load the dataset
data = pd.read_csv("C:/Users/anuro/OneDrive/Desktop/CBL/deliver.csv")
data.columns = data.columns.str.strip()  # Remove trailing spaces
data = data.rename(columns={"Restaurnat Rating": "Restaurant Rating"})

# Sentiment columns
sentiment_cols = ['Ease and convenient', 'Health Concern', 'Late Delivery', 
                  'Poor Hygiene', 'Bad past experience', 'More Offers and Discount']

# Map Likert scale to numeric values
likert_mapping = {
    'Strongly agree': 5, 'Agree': 4, 'Neutral': 3, 
    'Disagree': 2, 'Strongly disagree': 1
}

for col in sentiment_cols:
    data[col] = data[col].map(likert_mapping)

# Calculate average sentiment score per row
data['Sentiment Score'] = data[sentiment_cols].mean(axis=1)

# Classify sentiment
def classify_sentiment(score):
    if pd.isna(score):
        return 'Unknown'
    elif score >= 4:
        return 'Positive'
    elif score >= 2.5:
        return 'Neutral'
    else:
        return 'Negative'

data['Sentiment'] = data['Sentiment Score'].apply(classify_sentiment)

# Drop rows with unknown sentiment (all sentiment cols missing)
data = data[data['Sentiment'] != 'Unknown']

# Features and target
features = ['Age', 'Gender', 'Marital Status', 'Occupation', 'Educational Qualifications', 
            'Family size', 'Frequently used Medium', 'Frequently ordered Meal category', 
            'Perference', 'Restaurant Rating', 'Delivery Rating', 'No. of orders placed', 
            'Delivery Time', 'Order Value', 'Maximum wait time', 'Influence of rating']
X = data[features]
y = data['Sentiment']

# Handle missing values and encode categorical variables
X = X.fillna('Unknown')  # Fill missing categorical values
label_encoders = {}
for col in X.columns:
    if X[col].dtype == 'object':
        label_encoders[col] = LabelEncoder()
        X[col] = label_encoders[col].fit_transform(X[col])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Predict and evaluate
y_pred = rf.predict(X_test)
print(classification_report(y_test, y_pred))

# Feature importance
importances = rf.feature_importances_
feature_names = X.columns
feature_importance_df = pd.DataFrame({'Feature': feature_names, 'Importance': importances})
feature_importance_df = feature_importance_df.sort_values('Importance', ascending=False)

# Plot feature importance
plt.figure(figsize=(10, 6))
plt.bar(feature_importance_df['Feature'], feature_importance_df['Importance'], color='skyblue')
plt.title('Feature Importance in Sentiment Prediction', fontsize=14)
plt.xlabel('Feature', fontsize=12)
plt.ylabel('Importance', fontsize=12)
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.savefig('feature_importance.png', dpi=300)
plt.close()

print("Feature importance plot saved as 'feature_importance.png'")