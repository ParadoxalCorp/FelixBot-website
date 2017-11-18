# FelixBot-website

### local ssl certificate

to create a local ssl certificate you will need to use openssl

### setup of nginx reverse proxy

write in the terminal - `sudo nano /etc/nginx/sites-available/default`

insert 
```
server {
    listen 80;

    server_name felix-bot.xyz;

    location / {
        proxy_pass http://localhost-ip-here:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
     }
}

```

### webstites config file

the cofiguration file in `server/config/_config.example.js` needs to be configured and renamed to `_config.js`