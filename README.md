# Web-Calendar

Connect your Google calendar and display your daily events, used on a Raspberry Pi 3 with a small hdmi screen attached. Also includes a weather widget.

## Setup
### Backend
Create a [Google Cloud](www.cloud.google.com) Project, enabling Calendar API
Request an OAuth token, download credential JSON file and place in `./backend`

```
cd backend
python server.py
```

### Frontend
```
cd frontend
npm install
npm run dev
```
