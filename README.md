# Chiltern Music Therapy
A digital tool to support the provision of music therapy

**Live version**
This is the live version in an alpha release for use with therapists and their clients. 
- [View live site](https://chiltern-music-therapy.herokuapp.com/login)

**Design Prototypes**
There are wireframes which include further features not currently in the alpha release 
- [Client Prototype](https://www.figma.com/proto/CcYmhfnXreAPxlfyEmGsAH/Chiltern-Music-Therapy?node-id=854:22703&scaling=scale-down&page-id=469:34088)
- [Therapist Prototype](https://www.figma.com/proto/CcYmhfnXreAPxlfyEmGsAH/Chiltern-Music-Therapy?node-id=700:1202&scaling=scale-down&page-id=700:1202)


## Contributors / Team

| Who🧍‍♀️🧍       | Role 🌐     | Intro 💬 |
| :-------------: | :----------: | :-----------: |
| Joe | Yalla - Scrum & Developer | |
| Jem | Yalla - Lead Designer | |
| Ramy | Yalla - Development (Lead) | 
| Fadi | Yalla - Development (Frontend) |
| Simon | Yalla - Development | |
| Irene | Chiltern - Product Owner | |
| Rebecca | Chiltern - Project Sponsor | |
| Tim | Chiltern - Technical Lead | |



## Part of the Catalyst and The National Lottery Community Fund COVID-19 Digital Response
The collaboration was made possible by CAST and the National Lottery Community Fund. This fund is aimed at organisations whose work has been affected by COVID-19 and who need emergency funding to continue to deliver essential services. It will support them to develop the digital, data and design capabilities that allow them to address urgent issues and serve the most vulnerable.

## Project outputs overview
- Validated user journeys 
- Mobile prototypes
- Questions set to help someone understand their digital skill level
- Prioritised backlog
- ALPHA web app – ready to deploy 
- Live testing of the ALPHA product with real users
- Independent PEN security testing of the product


## User Needs Statements

- Music therapy beneficiaries in isolation
    - As a music therapy beneficiary unable to attend sessions in person I need user-friendly, digital access to online therapy services and personalised therapeutic content so that I can continue my therapy plan, in a way that is consistent, flexible and accessible by beneficiary and therapist. 
- Music therapy beneficiaries gradually returning to in-person services 
    - As a music therapy beneficiary greatly affected by shortage of care services due to their slow return to normal availability, I need enhanced digital support in between in-person sessions to work towards therapeutic outcomes more effectively, according to my own timetable, using whatever web-enabled devices I have. 
- Music Therapists 
    - As a Music Therapist providing support services in-person and remotely/digitally, I need a secure, easy to use, cost-effective way to  upload clients’ personalised content and arrange their personalised therapeutic space and tasks according to their therapeutic plan and be confident of their attaining the full benefit of the therapy programme.
    - As a Music Therapist new to providing support services digitally, I might need some initial help to get confident and comfortable with this new way of working, so that I can reach optimal confidence, efficiency and effectiveness quickly.
- Wider Music Practitioners and Therapists
    - As a practitioner I need to understand and learn about risks associated with online digital therapy delivery, and how I can protect vulnerable people I work with, using well-researched and robustly secure platforms, storage and data-sharing. 


## Features completed
Three user types: 

1) THERAPISTS 
- Sign up, Log in (authentication)
- Welcome / onboarding screens
- Dashboard
- Add + invite clients (incl. therapy plan)
- View / edit clients
- Add programmes i.e. a series of content for things the client can work on that week at home
   - Add + share video content
   - Add + share audio content
   - Add + share written content
- Library to add and organise content (video / audio / written) they want to use regularly
- Receive email notifications of client activity
- Edit account

2) CLIENTS
- Sign up, log in (authentication)
- Welcome / onboarding screens
- Dashboard
- View programmes
- View / listen to video / audio 
- Send message updates to their therapist
- Share video / audio / written documents with their therapist
- Provide feedback to programmes
- Edit account
- Delete account

3) ADMIN
- Log in (authentication)
- View all content on the platform
- Filter based on type, therapist, categories

## Next steps
- ALPHA product created
- Complete any issues that come up from security testing
- Further funding secured so currently prioritising features in roadmap
- Set up maintenance agreement to cover the larger roll out planned

## Tech Stack overview
- Frontend >> main technology is ReactJS
- Backend >> main technology is NodeJS
- Database >> main technology is PostgresSQL
- Media storage >> AWS
- Deployment Platform >> [Heroku](https://www.heroku.com/) 

## Further documentation
All key documentation can be found in the Issues on this repo (e.g. UX Testing). Here are some quick references though:

- [Project Schedule / Timings](https://www.notion.so/General-Plan-a71df95a61e04f7a905360ac89c5eca8)

- [Tech Stack, External Services, Deployment Research & Recommendation](https://www.notion.so/Tech-Stack-External-Services-Deployment-Recommendation-4ded8db6cbfa40cc8cbf69a8ec50e97c)

- [Product Roadmap](https://www.notion.so/Product-Roadmap-8abb07b70f5e4c5fa233ab5b920b63ef)


---

# Developers Guide (How to get this product to run and how to customise it)

## Tech stack:
The app's tech stack is built on three aspects 
  - Front end tech stack >> main technology is ReactJS
  - Back end tech stack >> main technology is NodeJS
  - The Database  >> main technology is PostgresSQL

## Cloud Services:
  - Media storage >> AWS
  - Deployment Platform >> [Heroku](https://www.heroku.com/) 

## Getting Started

### How to get a copy of the project up and running on your local machine:
Please ensure you have this software installed and running on your local machine before you attempt to run this webapp.
Node: https://nodejs.org/en/
Postgresql: https://www.postgresql.org/download/

#### Setup
1. Clone the repo
2. Install Dependencies

```cd chiltern-music-therapy```

```$ npm run init:both```

3. Setup local Dev and Test Databases 
    >> Follow sql / postresql steps to set up a database and create super user with admin rights

4. Setup AWS and create an account

6. Add some more Environment Variables
    >> Create a .env file in the root
    >> Add you database connection strings as DATABASE_URL and DATABASE_URL_TEST
    >> Add more varialbes to your .env file (these are required for our authentication system, e.g. sign-up / log-in)
        >> SECRET=choose-your-secret, TOKEN_NAME=token, TOKEN_MAX_AGE=2592000000 
    >> Add more variables for AWS
        >> BUCKET
        >> BUCKET_REGION
        >> AWS_ACCESS_KEY_ID
        >> AWS_SECRET_ACCESS_KEY
    >> Add variables for an email address to send automated emails (we don't actually send them in local mode, but you will see them in your terminal and what would be sent etc)
        >> APP_URL = http://localhost:3000
        >> SENDER_EMAIL
        >> SEND_PASSWORD

6. Build the Database

```npm run build:db```

6. Run the Tests
To make sure everything is working as it should.

```$ npm test```

8. Run the Server

```npm run dev```

Wait for a compiled successfully message.

9. Have Fun
The webapp should now be running on localhost:3000 Now you can play with the code all you like 🎉

If you notice anything wrong with the instructions or the project isn't running as expected don't hesitate to raise an issue and we'll try to figure it out.

