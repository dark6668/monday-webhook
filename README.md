## Project Monday-Webhook

This project provides a webhook for Monday.com, which interacts with a table containing names and phone numbers of people. The webhook updates the phone number column based on the selected individuals and also updates the LINK column with a Google Maps link for their work location.

## Installation
To install and set up the project, follow these steps:

Clone the repository to your local machine using the following command:
bash
Copy code
git clone git@github.com:dark6668/monday-webhook.git
Install the necessary dependencies by running the appropriate command for your package manager. For example, if you are using npm:
bash
Copy code
npm install


## Configuration
Configure the job location column and link column in your Monday.com table. These columns will be used to store the work location information and the Google Maps link, respectively.
Configure a status column in your Monday.com table with the technician's name. Make sure the technician's name matches the name in the table with technician information.

Create a table with information about the technicians.
To change the permissions and configure the project, follow these steps:

If you need to modify the permissions, you can update the environment variables in Heroku or create a file called .env. In the .env file, define a variable named AUTHORIZATION and set it to your authorization code.

Ensure that the necessary environment variables are properly set to enable the webhook's functionality.

## Deployment to Heroku
To deploy the project to Heroku, follow these steps:

Create a repository on GitHub to host your project.

Clone the repository to your local machine using the git clone command, providing the repository's address. For example:

bash
Copy code
git clone https://github.com/your-username/repository.git
Create a new application on Heroku.

Specify the address of your GitHub repository in the Heroku application settings.

Push the code to Heroku by navigating to the project's directory in the terminal or command prompt and executing the following commands:

bash
Copy code
git add .
git commit -m "Write your comment here"
git push heroku master
If you're using a different branch, adjust the branch name accordingly.
**Note:** Make sure to add the necessary entries to the `.gitignore` file to exclude sensitive information such as `.env` files and `node_modules/` directory.
