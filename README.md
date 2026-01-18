This is a simple script that captures all of the BELABOX websocket messages and sends them to the Internet. This can be used for monitoring (e.g. using my [SRT Exporter](https://github.com/roflb0y/SRTExporter) for Prometheus)

### Installing
1. Login to your SBC (Radxa Rock, Orange Pi, Jetson Nano) via SSH. Clone the repo and cd into it.
   ```shell
   git clone https://github.com/roflb0y/BELABOX-Cloud-Homemade
   cd BELABOX-Cloud-Homemade
   ```
2. Install nano (because it's not installed by default)
   ```shell
   sudo apt install nano -y
   ```
3. Rename config.example.json to config.json and edit it. If you're using my SRT Exporter, the url should be ```http://<ip>:5050/belaboxstats```. Set the password to your BELABOX panel password. Leave the token empty.
   ```shell
   mv config.example.json config.json
   nano config.json
   ```
4. Install all the packages and run
   ```shell
   npm install ws axios
   npm run start
   ```
   If everything is set up correctly, if you go to your metrics page at ```http://<ip>:5050/belaboxstats``` you should see something like this...
   <img width="452" height="239" alt="brave_yLUZLZLyLb" src="https://github.com/user-attachments/assets/5d2807b4-a509-4bb1-96f0-4d92efbe8ec2" />
   If so then proceed...
5. Install systemd service
   ```shell
   sudo cp belaboxws.service /etc/systemd/system/belaboxws.service
   
   sudo systemctl daemon-reload
   sudo systemctl start belaboxws
   sudo systemctl enable belaboxws
   ```
