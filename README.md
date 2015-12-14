# BJRN

Smart/Modern dating, end-to-end (BJRN)

An end-to-end dating application which helps sets up potential dates with matches through Tinder, uses NLP against the chat text to determine the match’s interests, preferences, time availability, etc. and helps schedule a date night at a great venue at a perfect time by leveraging Yelp and Google calendar APIs, and calls an Uber for you when it’s time to leave for the date. 

Prototype features (hackathon):
View Tinder matches info → implement nlp API to parse chat texts →  implement yelp functionality to suggest venues based on inferred preferences+location → find suitable times and schedule date using Google calendar

So far: basic NLP conversation parsing works (and Wit.ai models were trained), Yelp suggestions can work with user and date's preferences passed in, Google calendar free-time checking and scheduling is in place. Tinder/FB login works with some intermittent issues with Tinder's unofficial API. Couple fake FB/Tinder profiles have been set up for testing, and connecting all the moving parts more tightly and showing some nice front-end is in progress.

Technologies:
EC2, EBS, SNS, MongoDB, NodeJS, Amazon SQS with Message Timers
Yelp API, Wit.ai, Google Calendar API, Tinder js API, Facebook oauth, Uber API 

Google Doc with info:
https://docs.google.com/document/d/1XbJsZfKKVkiBkD3I-Z-wBwzLyXESjv5QTHTA8TztUlI/edit?ts=566e3ae0

