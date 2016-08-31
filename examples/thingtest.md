## Testing multiple bots that can communicate with each other

### Actions
| bot | action |
|-----|--------|
|thing1|scan|
|thing2|deactivate|
|thing3|capture|

### Knowledge
| bot | knowledge | values | default |
|-----|-----------|--------|---------|
|thing2|active|true,false|false|
|thing3|loose|true,false|false|
|thing3|scanner|<name of scanner>||

### Attributes
| bot | attribute |
|-----|-----------|
|thing2|kind = scanner|


### Demo should be able to do the following

- ask each of the bots the following: `what can you do`, `what do you know`, `what are your attributes`
- for each of the answers to `know` and `attributes` can ask: `what is your <knowledge/attribute>` and it replies with a value
- be able to set the knowledge on thing3 using message `@thing3 set your scanner to thing2`
- activate the scan using message: `@thing1 do scan`. This causes thing2's knowledge of active to go to `true` and it sends a message to the chat: `My active is now true`
- when thing2 active is true, thing3 picks up from chat and changes it's knowledge of loose to `true`, also with a chat message
- can now reset knowledge in thing2 and thing3 with chat messages of `@thing2 do deactivate` and `@thing3 do capture`

### Stretch goals

- thing1 should be monitoring chat and discovering bots with attribute of kind = scanner, then pick a random one when issued the scan command (we will need to add some more bots to make sure this works right)
- thing3 should be using its knowledge of scanner to only look for status messages from its attached scanner. IE: only thing2 going active should cause thing3 to go loose
