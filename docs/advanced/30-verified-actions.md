---
title: Verified actions
---

Verified actions work similarly to verified accounts on Twitter, or when you see a checkmark in Uniswap tokens. It's used to provide additional context to end users to provide increased assurance that they are executing the action they expect and can help prevent spoofing of actions. A key distinction here is that a Verified Action only exists in the context of a single action, we don't verify full projects or organizations. This is because the only thing that ties a verified action is the [action ID](/docs/about/glossary#action-id).

<table>
<tbody>
<tr>
<td className="text--center">
<img src="/img/verified-action.png" alt="Verified action screenshot" width="100" />
</td>
<td className="text--center">
<img src="/img/unverified-action.png" alt="Unverified action screenshot" width="100" />
</td>
</tr>
<tr>
<td>
This is how a <b>verified action</b> looks like for an end user.
</td>
<td>
This is how an <b>unverified action</b> looks like for an end user.
</td>
</tr>
</tbody>
</table>

When an action is verified, the metadata context (app name, action description and logo) for the verification request comes from our own server, as it contains already verified information. When the action is not verified, the metadata comes from

:::caution
Currently we don't support providing custom logos for unverified actions for security reasons. This may change in the future.
:::

Currently we only have an invite-only list of Verified Actions, however we hope to open this process in the future to make it easy to submit your own Verified Actions to the protocol.
