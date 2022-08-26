---
title: API Reference
---

## REST endpoints

### /verify

Enables you to verify a World ID proof for a **Cloud action.** To ensure [human-uniqueness](/docs/about/protocol#proof-of-uniqueness), a single person can only verify once for every action. If you send a proof for the same user twice, an error will be returned.

```
POST /api/v1/verify
```

**Headers**

```json
{
  "Content-Type": "application/json"
}
```

**Request**

<!-- spell-checker: disable -->

```json
{
  "merkle_root": "0x2264a66d162d7893e12ea8e3c072c51e785bc085ad655f64c10c1a61e00f0bc2",
  "nullifier_hash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
  "action_id": "wid_staging_eee20a5954e033deb983f48180ecac6c",
  "signal": "mySignal",
  "proof": "0x1aa8b8f3b2d2de5ff452c0e1a83e29d6bf46fb83ef35dc5957121ff3d3698a1119090fbeadf792c6f62dcd481f36819cd6d28380bd76dc30000449d6d81b87a60c5c9cecf97f25350063bfa9606419483ced7f78b450ff429c3e710b2575c62316daf97756236dcfcbb26351afc990874e5a0659995a4ac8e3eef5f721ac2b900136c3a152ef5c0b68e1786f797309e3bd97dc2183aab3b988437c61acc60d6f213fb1675a302c7ebd437d77bf36f0d5054a2eded3d4ec72ff9aa3fabea9609e18dbdffabd8012071c114e89df8209f36e5c9079b8ff237c7f3abe14076edf740058b5848efbd3d4b7ffb1fc7637311ea4e4511564a770bf189b7063d61d73df",
  "advanced_use_raw_action_id": false,
  "advanced_use_raw_signal": false
}
```

<!-- spell-checker: enable -->

| Parameter                    | Description                                                                                                                  | Type      | Required |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| `signal`                     | The signal you provided to the JS widget when verifying.                                                                     | `string`  | **Yes**  |
| `action_id`                  | The ID of the action you are verifying.                                                                                      | `string`  | **Yes**  |
| `nullifier_hash`             | As verbatim provided by the JS widget. See [JS response](/docs/js/reference#response) for details.                           | `string`  | **Yes**  |
| `merkle_root`                | As verbatim provided by the JS widget. See [JS response](/docs/js/reference#response) for details.                           | `string`  | **Yes**  |
| `proof`                      | As verbatim provided by the JS widget. See [JS response](/docs/js/reference#response) for details.                           | `string`  | **Yes**  |
| `advanced_use_raw_action_id` | Skip hashing and encoding action_id on the server-side. See [Advanced Signals](/docs/advanced/advanced-signals) for details. | `boolean` | No       |
| `advanced_use_raw_signal`    | Skip hashing and encoding signal on the server-side. See [Advanced Signals](/docs/advanced/advanced-signals) for details.    | `boolean` | No       |

**Response (200)**

```json
{
  "success": true,
  "nullifier_hash": "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
  "return_url": ""
}
```

- The parameter `return_url` will only be sent for actions running on a hosted page where the user should be redirected.

**Response (400)**

Error response sent when input parameters or proof are invalid. Some other error responses may be sent, please check the response body for details.

```json
{
  "code": "invalid_proof",
  "detail": "The provided proof is invalid and it cannot be verified. Please check all inputs and try again.",
  "attribute": null
}
```

**Response (400)**

```json
{
  "code": "already_verified",
  "detail": "This user has already verified for this action.",
  "attribute": null
}
```

**Response (400)**

```json
{
  "code": "invalid_format",
  "detail": "You enabled 'advanced_use_raw_action_id' which uses the action ID raw (without any additional hashing or encoding),
  but the action ID you provided does not look to be validly hashed or encoded. Please check
  https://id.worldcoin.org/api/reference#verify for details.",
  "attribute": "action_id"
}
```

**Response (400)**

```json
{
  "code": "invalid_format",
  "detail": "You enabled 'advanced_use_raw_signal' which uses the signal raw (without any additional hashing or encoding),
  but the signal you provided does not look to be validly hashed or encoded. Please check
  https://id.worldcoin.org/api/reference#verify for details.",
  "attribute": "signal"
}
```

### /precheck/{id}

Enables fetching information about a particular action to determine eligibility for verification. This endpoint is also used by the hosted page, Kiosk and Worldcoin mobile apps to show metadata about the action being verified.

:::tip
Bear in mind this endpoint will only return information for active actions.
:::

:::note
This endpoint requires no authentication, but is rate limited.
:::

```
POST /api/v1/precheck/{id}
```

**Headers**

```json
{
  "Content-Type": "application/json"
}
```

**Request**

```json
{}
```

**Response (200)**

```json
{
  "id": "wid_fd607652ad9c8b70930463e70c2fc504",
  "public_description": "Receive a bunch of tokens from my awesome airdrop!",
  "name": "My Awesome Airdrop",
  "is_staging": false,
  "team": {
    "app_name": "Mesha Airdrop",
    "is_verified": false,
    "verified_app_logo": "",
    "__typename": "team"
  },
  "__typename": "action"
}
```

- The `verified_app_logo` will contain an absolute URL to the location of the logo for this app.

**Response (400)**

```json
{
  "code": "not_found",
  "detail": "We couldn't find an action with this ID. Action may be no longer active.",
  "attribute": null
}
```

### /jwks

This endpoint lets you retrieve the JWKs (public keys) used to verify the signature on JSON web tokens that authenticate a verification request from the Developer Portal. This verification method is only used if you are using the **Hosted page user interface.**

```
POST /api/v1/jwks
```

**Headers**

```json
{
  "Content-Type": "application/json"
}
```

<!-- spell-checker: disable -->

**Response (200)**

```json
{
  "keys": [
    {
      "e": "AQAB",
      "n": "09ETz2k4_9IbDBYK_Tcr6DzbDdJPeqIgvoeUvXNVjNU8mYzFbhdqh8jRH80FwtuoFqyw5oyuG9ILHxfGaG_SeutPWSxBsqulXhxTnTAx2i8HtF0i2toMuvsEtiAjQ3hD4_w2xInBVOO98WAGcNA_UgWAG2DlWpe2km_V5bv3iKteCsSTZtzT3RjEO6FeOlVr8rmx9EGwWITdPIvrEXm_3REFqvDOnQvLu2-Au8m1V3U_6404m4RV_wlWGPnhHfG57VTkkqjgrnFKGUDniG-VMJs-WFX4VIQRvy2z1A5nQsmYpobK_clGyV0D0i5P1A_lmWGDEXBLSjEW9zH_o0d2DQ",
      "kty": "RSA",
      "kid": "jwk_8934bcc47ec5b86dd490cc2a46f18a5e"
    }
  ]
}
```

<!-- spell-checker: enable -->

## GraphQL endpoint

Interaction with the Developer Portal API is mostly done through a GraphQL endpoint, which enables retrieving information and interacting with any of the API objects. You can read more about [queries](https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/query/) and [mutations](https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/mutation/) for GraphQL to help you construct your query.

The GraphQL endpoint can be accessed at the endpoint below

```
POST /v1/graphql
```

**Headers**

```json
{
  "Content-Type": "application/json",
  "Authorization": ""
}
```

- The `Authorization` header should be set as detailed in the [Authentication](authentication) section.

**Request**

```json
{
  "query": "<your_GraphQL_query_or_mutation_here>"
}
```

Some example of GraphQL queries can be found below,

#### Listing actions

**Request**

```graphql
query MyActions {
  action {
    id
    name
    status
  }
}
```

#### Listing nullifiers for action

**Request**

```graphql
query ActionNullifiers {
  action(where: { id: { _eq: $action_id }, status: { _eq: "active" } }) {
    id
    is_staging
    engine
    return_url
    nullifiers {
      nullifier_hash
    }
  }
}
```
