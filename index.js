const Discord = require('discord.js');
const fetch = require('node-fetch')
const client = new Discord.Client();
const prefix = "?"

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
  
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

  if (command === 'me'){
    fetch('https://cackle.cc/api/v2/getUserFromDiscord.php?id=' + message.author.id)
    .then(res => res.json())
    .then(json => {
      message.channel.send('Cackle Username: ' + json.user_name + "\nCackle ID: " + json.user_id)
    })
  }

	if (command === 'post') {
    fetch('https://cackle.cc/api/v1/getPost.php?id=' + args[0])
    .then(res => res.json())
    .then(json => {
      const exampleEmbed = {
        color: 0xadd8e6,
        title: json.post_title,
        url:'https:/\/cackle.cc/?post=' + args[0],
        author: {
          name: json.posters_uname,
        },
        description: json.post_data,
        timestamp: new Date(),
        footer: {
          text: 'Cackle Bot',
        },
      };
      message.channel.send({embed: exampleEmbed})
    });
    }
})

client.login('your token here')