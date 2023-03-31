# StockVision

* *Date Created*: 25 Mar 2023
* *Last Modification Date*: 28 Mar 2023
* *Lab URL*: <https://csci4177-group19-project-2.vercel.app> 
* *Stable Deploy* <https://group19project.netlify.app>
* *GitHub URL*: <https://github.com/alexphl/csci4177_g19_project>
* *GitLab URL*: <https://git.cs.dal.ca/cparker/csci4177_group19_project>

## Authors

* [Crystal Parker](cr838048@dal.ca) - *(Authentication)*
* [Herman Liang](yq687754@dal.ca) - *(Role)*
* [YuanZhe Zhang](Yn680471@dal.ca) - *(Role)*
* [Alex Prokhvatylo](alexey@dal.ca) - *(Role)*
* [Liam Osler](liam.osler@dal.ca) - *(Role)*


## Getting Started

**[Optional]** If needing to provide the marker with a copy of the project that should run on their local machine for development, testing and/or marking purposes. Please include the following sections.

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this lab / assignment / project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

```
node, NPM

```



### Installing


```
- pull from git

- npm install

- npm run dev
```

## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* [NEXTJS](https://nextjs.org/) - The web framework used
* [Github](https://github.com/) - Dependency Management
* [MaterialUI](https://mui.com/material-ui/) - Used to generate RSS Feeds
**

## Crystal's branch
vert - Crystal's main branch
vert2 - abandoned

## Features Developed by Crystal Parker 
Authentication 
User Preferences

## Pages Developed by Crystal Parker (path shown)
src/utils/models/userModel.js
src/utils/controllers/userController.js
src/utils/routes/userRoutes.js

src/app/userContext.tsx

src/app/login-register/LoginForm.js
src/app/login-register/LoginOrRegister.js
src/app/login-register/page.js
src/app/login-register/RegistrationForm.js

src/app/dashboard/preferences/DeleteForm.js
src/app/dashboard/preferences/page.jsx
src/app/dashboard/preferences/ResetForm.js
src/app/dashboard/preferences/UpdateForm.js

## Overview of changes
Changes since the last assignment when I completed roughly the front end login and register implementation:

First I did the backend code, it wasn't too bad because I had completed the MERN tutorial linked bellow and I've also been using the same stack in my cloud term project, I'm starting to feel like I understand the MERN stack pretty well. I like how there are models, routes and controllers it separates everything out into understandable parts.

Then I realized I also needed to do the front end for user preferences, so I did that pretty easily with some reference to my previous code and searching errors to fix bugs. 

The trouble came when it was time to integrate the backend and the frontend. I found that part hard, it was like wack-a-mole, one bug after another. I felt really stupid when some of the bugs that took me the longest were tiny little fixes. 

## Sources Used

### LoginForm.js RegistrationForm.js

*Lines 36 - 50*

```
  const isValidPassword = (val) => {
    // https://stackoverflow.com/a/59317682
    let regEx = new RegExp(
    // ^                               start anchor
    // (?=(.*[a-z]){1,})               lowercase letters. {1,} indicates that you want 1 of this group
    // (?=(.*[A-Z]){1,})               uppercase letters. {1,} indicates that you want 1 of this group
    // (?=(.*[0-9]){1,})               numbers. {1,} indicates that you want 1 of this group
    // (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself. {1,} is redundant, but good practice, in case you change that to more than 1 in the future. Also keeps all the groups consistent
    // {8,}                            indicates that you want 8 or more
    // $                               end anchor

      /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
    );
    return regEx.test(val);
  };

```

The code above was created by adapting the code in [stackoverflow](https://stackoverflow.com/a/59317682) as shown below: 

```
Basic Explanation

(?=(.*RULE){MIN_OCCURANCES,})     
Each rule block is shown by (?=(){}). The rule and number of occurrences can then be easily specified and tested separately, before getting combined

Detailed Explanation

^                               start anchor
(?=(.*[a-z]){3,})               lowercase letters. {3,} indicates that you want 3 of this group
(?=(.*[A-Z]){2,})               uppercase letters. {2,} indicates that you want 2 of this group
(?=(.*[0-9]){2,})               numbers. {2,} indicates that you want 2 of this group
(?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself. {1,} is redundant, but good practice, in case you change that to more than 1 in the future. Also keeps all the groups consistent
{8,}                            indicates that you want 8 or more
$                               end anchor

```

- <!---How---> The code in [stackoverflow](https://stackoverflow.com/a/59317682) was implemented by lsu_guy
- <!---Why---> [stackoverflow](https://stackoverflow.com/a/59317682)'s Code was used because Herman didn't understand the regex I was previously using, and wanted me to simplify it. I looked at a few solutions and I liked this one because it was explained better and I felt like I could use it as a future reference.
- <!---How---> [stackoverflow](https://stackoverflow.com/a/59317682)'s Code was modified by I set the values to 1 for each capital, numbers, symbols and letters so that there would be more permitted passwords, to make testing easier.
*Repeat as needed*

## Acknowledgments

* I received advice at many points from my teammates, I appreciate them trying to help.

# Resources
https://dev.to/documatic/what-is-bcrypt-how-to-use-it-to-hash-passwords-5c0g

(MERN stack youtube tutorial) [https://youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE]
- This is a tutorial I went through when I first started the course and my team told me they wanted to do MERN stack it was very helpful
(MERN find )[https://www.geeksforgeeks.org/mongoose-find-function/]
- Looked up the details about find to be able to better search
-  https://www.npmjs.com/package/bcrypt


# NOTES: These are some notes I had with links I skimmed but didn't get back to because I ran out of time. 
- MongoDB will make an id for me, so I don't need uuid 
- Sanitize inputs found this advice: https://stackoverflow.com/questions/46718772/how-i-can-sanitize-my-input-values-in-node-js
- docs validator: https://express-validator.github.io/docs/
- docs sanitizor: https://flaviocopes.com/express-sanitize-input/