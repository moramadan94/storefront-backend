## API Endpoints

#### Users

- Index `/users` [GET] [token required]
- Create `/users` [POST]
- Read `/users/:id` [GET] [token required]
- Update `/users/:id` [PUT] [token required]
- Delete `/users/:id` [DELETE] [token required]
- Auth `/users/auth` [POST]

#### Products

- Index `/products` [GET]
- Create `/products` [POST] [token required]
- Read `/products/:id` [GET]
- Update `/products/:id` [PUT] [token required]
- Delete `/products/:id` [DELETE] [token required]

#### Orders

- Index `/orders` [GET] [token required]
- Create `/orders` [POST] [token required]
- Read `/orders/:id` [GET] [token required]
- Update `/orders/:id` [PUT] [token required]
- Delete `/orders/:id` [DELETE] [token required]

## Data Shapes

#### User

Table: _users_

- id `SERIAL PRIMARY KEY`
- email `VARCHAR(50) UNIQUE`
- username `VARCHAR`
- firstname `VARCHAR`
- lastname `VARCHAR`
- password_digest `VARCHAR`

#### Product

Table: _products_

- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### Orders

Table: _orders_

- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `BOOLEAN`

Table: _order_products_

- order_id `INTEGER` `REFERENCES orders(id)`
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`

## Author

Mohamed Ramadan (https://github.com/moramadan94)
