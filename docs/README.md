# Introduction

Socket Server with Dynamic Event Setup or **strides**, is a backend based architecture that offers
easy to implement mix-and-match api with real-time based application.

**Strides** built based on SoC (Separation of Concern) principal. Make it clear to 
separate between http and socket functions

**Strides** based on popular nodejs http framework (express) and popular nodejs socket library (socket.io)
which already using redis adapter scalability convenience. **Strides** also provides concepts of 
***workers*** for highly intensive data-exchange. The workers is also based on another popular
messaging library (RabbitMQ).

# Technical Requirement
  - node v10 or above.
  - redis v5.07 or above.
  - latest LTS of rabbitMQ.