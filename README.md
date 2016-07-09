# turbochat

turbochat is a framework for creating chat bots that interface with IoT devices as well as each other. The intent is to create a natural language interface (both written and spoken) to a network of bots.

## Phase I

Create the framework components to allow IoT devices to chat (specific chat platform TBD, possibly Slack) with minimal code necessary on the IoT device, and minimal hub/server infrastructure.

## Phase II

Allows chat interfaces to talk to each other. This allows for creating Meta bots that can provide a single interface into multiple bots. Bots should also be able to communicate with each other using simple triggers.

## Phase III

Bots have motivations and are self configuring. Motivations are things like a thermostat that is motivated to keep costs down while simultaneously providing a comfortable temperature. Because bots can communicate, this should allow for some emergent behaviors as the bots attempt to satisfy their motivations by cooperating with other bots.

## Phase IV

Bots share knowledge to create "contexts" that can be used across the bot network. These contexts can be used to create more elaborate behaviors based on the motivations of individual bots.

## Technology

TBD but looking into microservices architecture like Lambda from Amazon. The key is that the bot network above should be easy to setup (super minimal configuration), and scale to infinity if necessary. Focusing less on specific hosts.

Some references to look into:
  https://aws.amazon.com/lambda/
  https://aws.amazon.com/kinesis/
  https://aws.amazon.com/dynamodb/
