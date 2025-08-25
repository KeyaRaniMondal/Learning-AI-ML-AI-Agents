#to run streamlit run fraudDetection.py
import streamlit as st
import pandas as pd
import joblib

model=joblib.load("fraud_detection_pipeline.pkl")
st.title("Fraud detection predection app")
st.markdown("please enter the transaction details and press the predict button")
st.divider()
selection_type=st.selectbox("Transaction Type",["PAYMENT","TRANSFER","CASH_OUT","DEPOSIT"])
amount=st.number_input("Amount",min_value=0.0,value=1000.0)
oldbalanceOrg=st.number_input("Old Balance (sender)",min_value=0.0,value=10000.0)
newbalanceOrig=st.number_input("new Balance (sender)",min_value=0.0,value=9000.0)
oldbalanceDest=st.number_input("Old Balance (receiver)",min_value=0.0,value=0.0)
newbalanceDest=st.number_input("new Balance (receiver)",min_value=0.0,value=0.0)

if st.button("predict"):
    input_data=pd.DataFrame([{
        "type":selection_type,
        "amount":amount,
        "oldbalanceOrg":oldbalanceOrg,
        "newbalanceOrig":newbalanceOrig,
        "oldbalanceDest":oldbalanceDest,
        "newbalanceDest":newbalanceDest
    }])

    prediction=model.predict(input_data)[0]
    st.subheader(f"Prediction:'{int(prediction)}'")
    if prediction==1:
        st.error("This transaction can be fraud")
    else:
        st.success("This transaction looks like it is not fraud")