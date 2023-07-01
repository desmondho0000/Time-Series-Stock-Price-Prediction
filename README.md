# Time-Series-Stock-Price-Prediction

# _ABSTRACT_
In this project, we are studying the behaviour of stock market prices using some statistical methods and deep learning method. Use time series analysis such as autoregressive integrated moving average ARIMA (p, d, q) model and deep learning such as long short-term memory networks (LSTM) model. We discuss the economic crisis problem, and then explain how autoregressive integrated moving average ARIMA (p, d, q) model models and long short-term memory networks (LSTM) model work. The forecasting method can help them to reduce the risk. The dataset Top Glove Corp Bhd (7113.KL) using in our project. Therefore, we will use MAPE (mean absolute percentage error), MSE (Mean Square Error) and RMSE (Root Mean Square Error) to find out which model is suitable model for prediction stock market price. We found that accuracy MAPE LSTM 3.1% is lower that ARIMA MSE 50%. Therefore, LSTM is more suitable model for prediction stock market price.

## INTRODUCTION

The fact that the global financial crisis has resulted in a shortage of resources and a broad 
decrease in stock value is no longer breaking news. The stock market is a platform that 
enables smooth acquisitions and sells of company shares for every sector of business and for 
every individual. Beyond that, it seems that everyone wants to be able to anticipate future 
stock market prices, especially when doing so can result in incentives and benefits. Time 
series techniques can therefore be utilised in the stock market to lower the risk of loss and 
raise profits.

A time series is a collection of data points that appear in a predetermined pattern throughout 
time. This can be compared using cross-sectional data collected at several time intervals. 
Investing time series keep track of changes in specific data points over a specified time 
period and record data points at regular intervals. As a result, time series analysis examines 
and simulates organised observational sequences using statistical approaches. This modelling 
results in a process model of the system that generates data at random. The majority of the 
time, but not always, observations are sorted across time, especially when they are spread out 
uniformly. In more theoretical literature, a time series is merely an observation or 
measurement expression of a random process.

## OBJECTIVE

Our objective on this paper is to introduce time series autoregressive integrated moving 
average (ARIMA) model and deep learning model Long Short-Term Memory (LSTM) to 
find out which model is suitable model for prediction stock market price.

## METHODOLOGY

### Data Description 
The company selected for this paper is Top Glove Corp Bhd (7113.KL), which is publicly 
available on the Yahoo Finance website. Because this company is a glove factory that 
produces medical gloves and other types of gloves, it is important to do some research on it. 
There has been a large market for glove-related products during the recent pandemic.
Classical Time Series 
1. ARIMA
The autoregressive integrated moving average (ARIMA) statistical analysis model for timeseries data is used to analyse data sets and forecast trends. ARIMA is a statistical model that 
uses historical data to predict future values and is referred to as being autoregressive. For 
instance, an ARIMA model might forecast future stock prices based on past earnings or 
performance of a company. Three parameters make up the ARIMA model: the AR(p) 
process, the I(d) process, and the MA(q) process. The model finally takes the form ARIMA 
(p, d, q).
Deep Learning Time Series 
2. LSTM 
In applications involving time series analysis, recurrent neural networks (RNNs) of the 
LSTM (Long Short-Term Memory) type are frequently employed. The fundamental 
advantage of LSTMs over conventional RNNs is their capacity to recognise and remember 
long-term dependencies and patterns in time-series or sequential data. Because of their 
distinctive architecture, LSTM models are particularly effective at modelling long-term 
dependencies in time series data. This is because each time step allows them to selectively 
forget or remember information. The four types of gates utilised in LSTM models are input 
gates, forget gates, change gates, and output gates.
 

## RESULT

### Data Splitting
In our experiment, the dataset used in this paper consists of the adjusted closing price in 
daily. The dataset is corresponding the period from 27/01/2017 to 31/12/2021. In addition, for 
ARIMA model and LSTM model, we selected the data from 27/01/2017 to 14/12/2020 for 
the training dataset and 2020/12/15 to 2022/12/31 is used to testing dataset.

![datasplit](https://github.com/desmondho0000/Time-Series-Stock-Price-Prediction/assets/62163350/81ffce04-f660-4f62-ad52-3f9a04b28aff)

ARIMA model 
1. Check for stationarity
On this paper, ARIMA model is require to meet the requirement of stationary data or not 
stationary data. We will use ADF test to test the series is stationarity or not stationarity. We 
found that original data series p-value is 0.5898 is more than 0.05 which mean is failed to 
reject the hypoyhesis and conclude that the series is non-stationary. After that, the series is 
non-stationary we can use the first difference to make the data series become stationary. On 
this part, we found that first difference on ADF test p-value is 7.453808e-09 which is less 
than 0.05 which mean is hypoyhesis is rejected and conclude the series is stationary. 
Therefore, we can use this series to found the ACF plot and PACF plot.


![ACF and PACF](https://github.com/desmondho0000/Time-Series-Stock-Price-Prediction/assets/62163350/536df6c2-131c-420b-8d10-72468e1e8d95)

3. Parameter estimation
ARIMA model is contains three parameters: p, d and q.
First, through by the ADF test, to check the stationary after the differencing. We using one 
differencing to make the series become stationary then d=1. After first differencing, the data 
in this paper is stable. So, we set d = 1.
For the p and q, we will use autocorrelation function ACF plot and partial autocorrelation 
function PACF plot to choose which lag is more suitable for the model and we will use AIC 
criterion and MSE to select the best model. We found that using ACF and PACF, AR=2 and 
MA = 2 and 5. The ARIMA models can written as ARIMA (2, 1, 2) and ARIMA (2, 1, 5). 
ARIMA (2, 1, 5) having a lowest AIC and MSE which is 3.56 and -868.654. Therefore, we 
can use this model as our paper.




5. Auto-ARIMA 
For the Auto-ARIMA, is used the grid search method to choose the parameter. For the grid 
search method, Auto-ARIMA also used AIC to choose the best parameter p, d and q. On 
Auto-ARIMA, ARIMA model found that is ARIMA (2, 1, 3) which is AIC -866.689.

![auto ARIMA](https://github.com/desmondho0000/Time-Series-Stock-Price-Prediction/assets/62163350/4d8cdf81-9c00-431c-ae68-4d8facdd3914)

Therefore ARIMA (2, 1, 5) choose for prediction.

![Screenshot 2023-06-23 145305](https://github.com/desmondho0000/Time-Series-Stock-Price-Prediction/assets/62163350/637cc3ff-905f-46aa-b34a-0ef746c84cb0)

## LSTM model 
1. Normalization
To detect the stock market price pattern, the normalization method is very important on the 
model. LSTM is the one of the neural networks, we will use “min-max’ normalization 
method to reform the dataset to make the training dataset between 0 to 1. After, we end the 
prediction we must de-normalization to get back the original price.
2. Training Set
LSTM model parameter adjustment is the key to train the neural network. In this paper, I will 
use two-layer LSTM to make a prediction followed by an LSTM layer, an LSTM layer, dense 
layer. The batch size is 3 and the run epochs is 40, in this case, a batch size of 3 means that 
the model updates its weights after processing 3 samples at a time. Next, will run the 40 
epochs, which means that it processes the entire training dataset 40 times during training. The 
first layer in sequences of length 60 and has 128 neurons. This layer has 66,560 trainable 
parameters. Second layer in 64 neurons and does not return sequences and This layer has 
49,408 trainable parameters. First Dense layer, which has 25 neurons. This layer has 1,625 
trainable parameters. Second Dense layer, layer has 26 trainable parameters. Overall, the 
model has 117,619 trainable parameters

![d](https://github.com/desmondho0000/Time-Series-Stock-Price-Prediction/assets/62163350/732e3e25-7429-4422-80a3-d3e299ba1725)

![da](https://github.com/desmondho0000/Time-Series-Stock-Price-Prediction/assets/62163350/f488ad84-2847-4a5d-8d6a-1f1f8302b6f8)

## CONCLUSION

#### Model Evaluation
Accuracy metrics are obtained directly from 2020-12-15 to 2021-12-31. MAPE (mean 
absolute percentage error), MSE (Mean Square Error) and RMSE (Root Mean Square Error) is 
commonly to interpret and explain in the Time series diagnostic check. We found that LSTM 
having a similar accuracy value which is MAPE 0.31, MSE 0.024 and RMSE 0.16. 
Therefore, LSTM model is the best model on this paper for prediction stock market price 
compare with other ARIMA model.

![result](https://github.com/desmondho0000/Time-Series-Stock-Price-Prediction/assets/62163350/c1b32616-69ca-4dd0-9381-8c01c3366272)


## Analysis Results
To sum up, this project mainly focuses on studying the movement of Top Glove (7113.KL) 
stock prices. Using statistical methods and deep learning methods to find a suitable model to 
predict stock market prices. In this study, the two models found are Automatic Integrating 
Moving Average (ARIMA) and Long Short-Term Memory (LSTM). These models are used to 
predict the Top Glove (7113.KL) stock prices. The LSTM model forecasting result is found to 
be closed to the Top Glove (7113.KL) daily stock prices from 2020/12/15-2022/12/31. 
Between the ARIMA and LSTM models, it is found that LSTM appears to be more 
suitable in predicting prices in the stock market. From the result shown in Table 1, we found 
that the LSTM model for predicting stock prices is the better options for prediction
