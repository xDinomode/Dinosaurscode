---
layout: post
title: "Bitcoin for Beginners"
description: "Learn what bitcoin is and how to get started yourself. Simple intro for beginners."
category: tips
---

<img src="/images/bitcoinlogo.png" alt="Bitcoin Logo" style="background:#333; margin:0 auto; display: block;">

Bitcoin enables online transactions without requiring a third party, such as a bank.

<!--more-->

### Why is it useful?

No one entity can freeze your account, impose high fees for transactions, and much [more](http://cs.stanford.edu/people/eroberts/cs201/projects/2010-11/DigitalCurrencies/advantages/index.html).

Anyone with an internet connection can do business online even a child.

### Quick explanation

Users store public/private keys in a [bitcoin wallet](https://bitcoin.org/en/choose-your-wallet).  

Users make [transactions](http://www.coindesk.com/information/how-do-bitcoin-transactions-work/) by digitally signing a message using their private keys authorizing the exchange. 

The transaction is broadcasted to all nodes (software running on the bitcoin protocol) on the bitcoin network and miners work to find a [nonce](https://en.bitcoin.it/wiki/Nonce) that when hashed solves a [proof of work](https://en.bitcoin.it/wiki/Proof_of_work). 

After which the transaction is stored permanently in a [block](https://en.bitcoin.it/wiki/Block) along with other blocks that form a block chain.

### How to get started

The first thing users do is download a bitcoin wallet that handles storing keys and making transactions.

The safest is [Bitcon Core](https://bitcoin.org/en/bitcoin-core/) but it isn't for beginners as it requires downloading the entire block chain ~65GB as of this writing.  

The preferred method is using an [SPV](https://bitcoin.org/en/glossary/simplified-payment-verification) such as [Electrum](https://electrum.org/#home) which doesn't require downloading the entire block chain and your private key is stored on your machine encrypted. 

Lastly, you could use an online service such as [Coinbase](https://www.coinbase.com/?locale=en) but your private key is stored by them and if their system is compromised your bitcoins are lost. And you're using a third party service which is the whole reason bitcoin was created to avoid.

### Things you should know

Bitcoin is not guaranteed to succeed. It will only thrive if more and more people use it.

Transactions are permanent since there's no third party and the way it is designed.

Bitcoins are [volatile](https://support.coinbase.com/customer/portal/articles/1834921-why-does-bitcoin-change-value-why-is-the-price-so-volatile-), meaning their price fluctuates based on if users are buying or selling them.

### From here

If you want an in depth book read [Mastering Bitcoin](http://chimera.labs.oreilly.com/books/1234000001802). Or for a quicker read try the [wiki](https://en.bitcoin.it/wiki/Help:FAQ).

Thanks for reading and hope you give [bitcoin](https://bitcoin.org/en/) a try!
