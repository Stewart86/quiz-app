# Quiz App Guide

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## User Management (Deprecated read below for updates)

### Login User Roles

1. Admin
2. Tutor
3. Student

#### Admin

1. Access to User management (Tutor and Student alike)
2. Ability to change Tutor and Admin role
3. Ability to access Signup for Tutor role
4. Access to Stripe Customer Portal
5. Ability to delete questions
6. To gain Admin role, signup new Tutor, then change the role to Admin
7. All features of Tutor role

#### Tutor

1. Access to manage questions (create, update, but not delete)
2. Tutor role can only be created by Admin
3. All features of Student role

#### Student (on Subscription only)

1. All access to quizes and notes

#### Student (Trial)

1. All access to quizes and notes (except for printing)

## Student Signup flow

1. Click on "Start your free trial" button
2. Register an account
3. Verify email
4. Subscription page
5. Access to content

###### note:

1. All subscription starts from free trial specified in Stripe (can be changed within Stripe and will in updated to app automatically. refer to [Stripe integration](#stripe-integration))
2. Cancelation during free trial period will allow user to continue using till the trial period ends
3. if user did not verify their account, the app cannot proceed further
4. if Student role user did not subscribe via Stripe, the app cannot proceed further

## Stripe Integration

Product and pricing will be updated automatically with this condition in place

- only 1 product and 1 price within the product must be within the Stripe account
- if multiple product in Stripe, this App will only takes the first product
- if multiple prices in the product, this App will only take the last price stated
- by any means try to stick to one product and price. This App is optimised this way

## App Architecture

### Techology Stack

- FireBase Auth
- FireStore
- React.js
- Stripe
- Google Cloud Functions (for Stripe use only)

### Key React Libary used

- React Material UI
- Rich Markdown Editor
- Lodash

## Tasks to complete by priority

1. Legal Documentations
   - terms and conditions
   - privacy policies (must be inline with data usage and retention)
2. Assets
   - favicons
   - logo
   - offical App Name
   - required images
3. Themes
   - primary color
   - secondary color
   - header font
   - body text font
   - alternative text font
4. Pre-deployment checklist
5. Post-deployment checklist
6. Maintenence Guide
7. Bug reporting Guide
