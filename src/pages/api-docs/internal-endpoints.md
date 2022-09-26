---
title: Internal Endpoints
---

:::caution
These endpoints are intended only for **internal use**, and should generally **not be used by developers**. They are documented here to assist with development.
:::

## App endpoints

The following endpoints are intended to be used only be the app's frontend. If you're looking to connect to the API, check out the [Authentication](/api/authentication) page.

### /login

:::note
This endpoint requires no authentication, but is rate limited.
:::

```
POST /api/v1/login
```

**Headers**

```json
{
  "Content-Type": "application/json"
}
```

**Request**

```json
{
  "email": "alice@worldidbot.com",
  "password": "12345678"
}
```

**Response (200)**

<!-- spell-checker: disable -->

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.HThTAuYC6RyvZgF5h2cJCVEUQZ9g8Y18Tf-IU2gaYBc"
}
```

<!-- spell-checker: enable -->

**Response (400)**

```json
{
  "code": "invalid_credentials",
  "detail": "Invalid email or password.",
  "attribute": null
}
```

### /signup

:::note
This endpoint requires no authentication, but is rate limited.
:::

```
POST /api/v1/signup
```

**Headers**

```json{
  "Content-Type": "application/json"
}
```

**Request**

```json
{
  "email": "bob@worldidbot.com",
  "password": "987654321",
  "name": "Bob",
  "team_name": "The Bob Project"
}
```

- All attributes are required.
- Password should be at least 8 characters.

**Response (201)**

<!-- spell-checker: disable -->

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.HThTAuYC6RyvZgF5h2cJCVEUQZ9g8Y18Tf-IU2gaYBc"
}
```

<!-- spell-checker: enable -->

**Response (400)**

```json
{
  "code": "already_registered",
  "detail": "This email address is already registered.",
  "attribute": "email"
}
```

## Management endpoints

:::info
These endpoints can only be called from the Hasura backend and they require a special token which is only shared between the two.
:::

### /\_ens

Fetches the Semaphore contract addresses from an ENS lookup and caches them locally.

```
POST /api/_ens
```

**Headers**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <secret>"
}
```

**Request**

```json
{}
```

**Response (200)**

```json
{
  "success": true
}
```

**Response (500)**

```json
{
  "success": false,
  "error": "Production address (0x) or staging address (0x) not found."
}
```

### /\_jwk-gen

Generates a new JWK to use for signing verification JWTs. Old keys are not rotated automatically, they can still be used until they reach their expiration date. Expiration date may be updated directly through Hasura's portal.

```
POST /api/_jwk-gen
```

**Headers**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <secret>"
}
```

**Request**

```json
{}
```

**Response (201)**

<!-- spell-checker: disable -->

```json
{
  "success": true,
  "jwk": {
    "id": "jwk_4bce24487b429dff79c8cfee38483308",
    "expires_at": "2023-06-14T06:29:35.794+00:00",
    "__typename": "jwks"
  }
}
```

<!-- spell-checker: enable -->
