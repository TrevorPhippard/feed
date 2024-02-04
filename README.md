# feed


# tools

https://dbdiagram.io/home



Table partners {
  id interger [primary key]
  name varchar
  created_at timestamp
  current_booking timestamp
}

table users {
  id interger [primary key]
  username varchar
  role varchar
  created_at timestamp
}

table deployments {
  id interger [primary key]
  partner_deployment_to varchar
  body text
  user_id integer
  status varchar
  created_at timestamp
}

table bookings {
  id interger [primary key]
  username varchar
  role varchar
  created_at timestamp
}


Ref: "bookings"."id" < "partners"."current_booking"

Ref: "partners"."id" < "deployments"."partner_deployment_to"

Ref: "users"."username" < "bookings"."username"

Ref: "users"."id" < "deployments"."user_id"

## vscode extentions

https://github.com/Huachao/vscode-restclient
REST Client: for .rest file to make request

