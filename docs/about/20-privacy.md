---
title: Privacy
---

We are committed to preserving each user's privacy and anonymity, collecting as little information as possible from our users. More on Worldcoin's commitment to privacy in [this blog post](https://worldcoin.org/privacy-by-design).

:::info
No one can personally identify a World ID account with a specific person. Further, there's no way to tie different World ID verifications with a specific identity.
:::

### Verification without storing iris images or any PII (\*)

When a user goes through the orb verification process, all the required computations are performed in real-time within the orb. The orb runs multiple neural networks to rule out fraud, recognize the iris and positions it properly in the frame. The pictures are then converted to an IrisCode (which is just a mathematical representation of the iris). Any images taken during the verification process are immediately deleted from memory and never transferred (unless the user opted to allow storage for research or convenience purposes, see below).

The orb receives an identity commitment from the user (created in the Worldcoin app) via a QR code and uses that commitment to submit a new verified identity to the set. When the user utilizes their identity (even to claim their free share of Worldcoin), a [Zero-knowledge proof](/docs/advanced/zero-knowledge-proofs) is used, so not even the identity commitment is tied to a particular wallet or any other user information.

:::info
The iris processing system is currently being developed and improved, in particular the way we extract the iris features. While we work on this, users have the option to store or not store their iris images in Worldcoin servers. If they choose to store their images, whenever the algorithm changes (we expect this to happen a few times during the year), we'll update their World ID automatically. Otherwise users will have to visit an orb again. Users retain control of deleting their iris images at any point.
:::

### Verification requests are not tied to an identity

All World ID verification request uses [Zero-knowledge proofs](/docs/advanced/zero-knowledge-proofs). This process allow the user to prove they are a user in the verified set (i.e. personhood) and they are only performing a particular [action](/docs/about/protocol#what-are-actions) once (i.e. uniqueness). However, each proof outputs a completely different and fully anonymized output. The proof reveals no information as to which identity signed the request.

The above also means that even if you sign multiple verification requests for multiple projects (or even the same one, but different actions), there's no way for anyone other than the identity holder to know that a certain identity has signed X number of requests, let alone know which ones.

## Example

An example of privacy in action is how a user signs up at an orb to claim their free share of Worldcoin (a use case for World ID):

1. The user creates a wallet on the Worldcoin app (no PII is required), and an identity commitment is generated.
2. The identity commitment is passed to an orb with a QR code. The identity commitment has no information regarding the user's wallet, device or any other PII.
3. The orb runs the verification process. Upon determining uniqueness of the iris set, the orb deletes all images taken during the process and submits the new identity to the Semaphore instance without any PII.
4. The user can now claim their free share of Worldcoin using World ID, they submit a ZKP proving they are in the set of verified users, and they have only claimed their free share once. When they do this, they have to include their wallet address to receive their free share of Worldcoin, but because the World ID process uses a ZKP, there's no way to tie a specific identity commitment to that specific request.
