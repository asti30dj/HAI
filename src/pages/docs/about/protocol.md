---
title: Protocol Overview
---

import Link from "@docusaurus/Link";

## How it works

The following diagram outlines the technical flow for a World ID transaction. Find more details on each component in the [Components](#components) section.

<div className="text--center">
<img src="/img/main-flowchart.png" alt="World ID Flowchart" width="600" />
</div>

When a user executes a World ID transaction they assert and prove two things:

1. They are a **human**.
2. They are performing a specific **action** (see below) **only once**.

### What are actions?

An action is something that a single human can perform only once. For example: receive an airdrop, vote on a specific issue, fund a specific project, create an account with a particular service. A project may request verification for multiple actions, but it's important to consider that [Proof of uniqueness](#proof-of-uniqueness) will be scoped to each action. More on actions can be found in the [Glossary](/docs/about/glossary#actions-advanced).

## Proof of personhood

The protocol relies on a [Semaphore](https://github.com/appliedzkp/semaphore) instance and zero-knowledge proofs, which allow a user to prove their membership to a set (in this case the set of verified identities) without revealing who they are. The Orb performs multiple real-time checks to ensure the person in front is a human that has not been seen before. Advanced details found on [Proof of personhood](/docs/advanced/proof-of-personhood).

<div className="text--center">
<img src="/img/orb.webp" alt="Picture of a Worldcoin orb" />
</div>

## Proof of uniqueness

Given that we don't know anything about the person who's proving their membership to the set, a critical piece of the protocol is making sure a person can only prove their membership in a particular context only once. For instance, if you're doing an airdrop, you want to make sure a single person can only claim the airdrop once. We do this through actions. A user can only submit a proof for an action once. To define each action, we use [action IDs](/docs/about/glossary#action-id) which is an arbitrary string that the verifying party crafts and provides. **A single user will always output the same [nullifier hash](/docs/about/glossary#nullifier-hash) for the same action ID.**

<div className="text--center">
<img src="/img/proof-of-uniqueness.svg" alt="When an existing proof for an action ID and the same identity is found, proof of uniqueness fails" />
</div>

**Example:**
Alice is an end user who has verified at a Worldcoin orb. MeshaApp is a dapp with a new token that wants to airdrop a piece but only once per person.

- MeshaApp asks Alice to verify with World ID and provides action ID `meshaApp-airdrop`.
- Alice generates a [ZKP](/docs/advanced/zero-knowledge-proofs) in their Worldcoin app using the action ID: `meshaApp-airdrop` => `nullifier_hash_1`.
- MeshaApp can verify the proof comes from an identity belonging to the set of verified identities and can store `nullifier_hash_1` in the list of claimed airdrops. **Note in particular, MeshaApp has no way of associating `nullifier_hash_1` to any particular identity**.
- If Alice ever generates another ZKP at any point in time for the same action ID `meshaApp-airdrop`, the generated nullifier hash will always be `nullifier_hash_1`, and therefore MeshaApp can decline any additional airdrop requests for claimed hashes.
- If Bob (another end user), generates a ZKP with their identity for action ID `meshaApp-airdrop`, the result will be `nullifier_hash_2` (different from Alice's nullifier hash).
- If Alice generates a ZKP for another action ID (e.g. `meshaApp-airdrop-2`), the generated nullifier hash will be different from the very first one => `nullifier_hash_3`.

## Components

<img src="/img/components.png" alt="" />

<table>
<thead>
<tr>
<th>Component</th>
<th>Owner</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>The Orb</td>
<td>Worldcoin (<i>OSS in 2022</i>)</td>
<td>Responsible for verifying personhood by obtaining biometric data and submitting verified identities for the protocol.</td>
</tr>
<tr>
<td>Worldcoin app</td>
<td>Worldcoin (<i>OSS in 2022</i>)</td>
<td>Non-custodial wallet that stores the private information from the World ID identity. <b>Generates ZKPs for World ID claims.</b></td>
</tr>
<tr>
<td><Link to="/docs/js">JS package</Link></td>
<td>Worldcoin (<Link to="https://github.com/worldcoin/world-id-js" target="_blank">OSS</Link>)</td>
<td><b>Integrate with your dapp</b> to easily interact with World ID and request and receive proofs from the Worldcoin app.</td>
</tr>
<tr>
<td>Client app</td>
<td>Developer (<b>You</b>)</td>
<td>Any dapp that has an action that wishes to protect behind World ID. The client app loads the JS package to use World ID.</td>
</tr>
<tr>
<td>Smart contract</td>
<td>Developer (<b>You</b>)</td>
<td>Main execution point of World ID. The smart contract verifies submitted ZKPs, ensures uniqueness of ZKPs and then executes whatever action. Can be forked from any of our <Link to="/examples">Example apps</Link>.</td>
</tr>
<tr>
<td>Client wallet</td>
<td>End user</td>
<td>Any ETH-enabled wallet. Executes the transaction the smart contract dictates, providing the ZKP details as well as any other needed parameters.</td>
</tr>
<tr>
<td>Sequencer</td>
<td>Worldcoin (<b>optional</b>)</td>
<td>Centralized server that helps batch multiple proof submissions to reduce gas cost.</td>
</tr>
<tr>
<td>World ID Backend</td>
<td>Worldcoin (<b>optional</b>)</td>
<td>Simple service that stores information on <Link to="/docs/advanced/verified-actions">Verified Actions</Link>.</td>
</tr>
</tbody>
</table>
