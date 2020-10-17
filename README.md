## Crypto trading application

This application uses a dummy server to communicate with. Find it here: https://github.com/willemruys/trader-server

## how to run it

Install packages using `yarn` and run `yarn develop`.

Make sure server is up and running.

### Add .env.local

And add server url:

`REACT_APP_API_ENDPOINT="http://localhost:3001"`

## available features

- Retrieve most recent bitcoin prices
- purchase and sell
- purchase / sale success and warning message

## what remains to be developed

- re-rendering after purchase and sales
- include updates with prices in graph
- open modal on clicking prominent 'sell button' in which you can select what you want to sell
- order order data on price
- REFACTORING!!!
