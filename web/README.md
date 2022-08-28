# Step to learn

It is a web-based learning application that can provide a learning roadmap to the naive user who is stepping into the world of learning some new skills.

- _Date Created_: 24 May, 2022

- _Last Modification Date_: 16 June, 2022

- _Git URL_: https://git.cs.dal.ca/frpatel/csci-5709-group-18

- _Netlify URL_: https://group-18.netlify.app/

## Professor

[Shehzeen Huda] (sh655624@dal.ca)

## TA

[Aadesh shah] (ad735938@dal.ca)
[Hari Arunachalam] (hari.arunachalam@dal.ca)
[Nikunj Goenka] (Nikunj.Goenka@dal.ca)
[Ana Khan] (ana.k@dal.ca)
[Bala Sundeep Krishna Dasari] (bl200240@dal.ca)
[Gurleen Kaur Saluja] (gr997570@dal.ca)
[Mansi Singh] (mn518448@dal.ca)

## Authors

- [Ferin Patel](ferin@dal.ca)

- [Jay Patel](jy977387@dal.ca)

- [Janvi Patel](jn398689@dal.ca)

- [Janvi Nayanbhai Patel](jn498641@dal.ca)

- [Jenish Girish Patel](jenish.patel@dal.ca)

- [Krutharth Patel](kr653484@dal.ca)

## Getting Started
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To develop a project in React, first we have to download and install node js on our local machine. Furthermore, we have install npx plugins in our node folder.

List of Required Softwares and Plugins:

1.  Node JS (environment)

2.  NPX plugins

3.  JavaScript (Programming language)

4.  React JS: Package

List of Dependencies:

1. React-router-dom

2. React-icons

3. Formik

4. Framer-motion

5. reactour

6. yup

### Installing

-First install all the required softwares.

1.  Download the Node js on our local machine.

2.  Install it and open any editor.(I have used Intellij ultimate)

3.  Then check whether the node is install or not by using node --v command'.

4.  After that choose specific folder where we have to create a application.

5.  Then create a react application withcommand: npx create-react-app PROJECT-GROUP18

6.  Install chakra ui with command npm install --save @chakra-ui/react

### Clone and run

1. Get the code base from gitlab, the link provided at the begining of the file.
2. copy the https link of the repo and use `git clone <COPIED_LINK>`. This will index the code base that is stored on the gitlab repo.
3. install the required dependencies with `npm install`.
4. In the same directory, use `npm run start` to start the local deamon for the site.
5. If all the step are followed correctly the browser will automatically launch a new tab with an address of `localhost:3000`.

End with an example of getting some data out of the system or using it for a little demo. You may also include a quick example of what the marker should see if the installation of all required software / libraries / plug-ins was successful.

## Deployment

- For deployment we have used Netlify which will help to host our application.

- At first we have pushed individual features to the gitlab repo at our individual branch.

- We added merge request to all the features. Merged them with review by team members.

- After getting the codebase on the the main branch we tested it in our local environment.

- Then we moved to netlify for deployment.

- Create a new site with option as import project then select gitlab.

- After getting authenticated with the gitlab we will select the repo/branch where our project code is present.

- we made sure that all the warnings are removed in the project that we had in the local project execution.

- As warnings are treated as errors during the production,if we are having zero warnings we are good to go with the deployment.

- Deployment started and it took 3-5 minutes to get live.

- Once the site preview is working properly then we could change the site-name at our convenience.

## Built With

- [Reactjs](https://reactjs.org/docs/getting-started.html) - The frontend web framework used

- [Chakra-UI](https://chakra-ui.com/guides/first-steps) - For more enhanced User Interface

- [Nodejs](https://nodejs.org/en/docs/) - The backend web frameword used

## Acknowledgments and References

During this project we as a team group 18 has started learning reactjs ,nodejs and chakra-ui from the scratch as some of the members of the group were familiar with the Reactjs framework it had helped us in the implementing our features. At the start we have learnt some basic concepts like components,routes etc from youtuber Net Ninja.The official beta documentation of Reactjs was very helpful as most of the concepts was get cleared from there only.

React-typescript (https://create-react-app.dev/docs/adding-typescript/) 
    Description: For creating the project template with react and typescript.

StackOverflow (https://stackoverflow.com/) 
    Description: I used Stack overflow to solve the errors related to react and typescript.
