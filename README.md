# Quiz App Guide

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## User Management (Deprecated read below for updates)

1. Admin and Tutor role can exist in a single account together
2. Being as a Admin or Tutor role will remove student and trial role
3. a user can only be either trial or student not both
4. upgrading to admin and / or tutor will remove student / trial role
5. disabling an account will automatically default user to trial role and disable
6. re-enabling user will start from trial role
7. IMPORTANT! you can disable yourself as an admin (a backup admin account will prevent accidental lock out)
8. a reminder will show below the page when due date is lesser than 7 days

## RBAC flow

- signup -> auto trial
- make payment -> trial to student | admin -> trial to tutor / admin
- trial 7 days
- subscription 30 days
- if role == trial -> check days left
- if role == student -> check days left
- if day left 7 show remind on questions (trial or renew)
- when subscribe -> subscribe page -> stripe payment -> subscribe function
  1. update expireStart field
  2. update role == student

## Revised RBAC flow

- Admin and Tutor can only be created by Admin Role
- signup to rename to -> start your trial now.
- Trial will only applied after a checkout session (CC needed? TBC)
  - only if trialing without CC info should we required reminder on number of days left for trial
- trial days and subcription will be configured in Stripe
- Stripe updates when user is `trialing` or `active` from status
- diasbled Admin or Tutor will not downgrade to student role based on previous User Management stated above
- students can still be disabled, but payment will not be refunded. Must manually refund using Stripe DashBoard

## Todo:

- tutor / admin account will be created with admin rights
- roles will be Admin, Tutor, Student (since trial is managed by Stripe)
- rewrite logic with `roles.student` and `roles.trial` to just `roles.student`
- access control for admin / tutor page to check if document exist in DB
- access for admin to check `isAdmin` field in DB
- rewrite router to remove `roles.trial`
- user table changes (update user table with the new data from Stripe)
  - including Customer Portal redirect
  - get trial data from `status` and days remainding from `trail_end` - `datetime.now`
  - remove account expiry from Staff
  - get account expiry from `current_period_end`
  - add last login time to tables
- loading progress for redirect to Stripe
- restrict printing on `trialing` status
- use `onSnapShot` to listen for subscription change to precisely restrict users
- remove `expiryStart` from user creation
- reset all users
- QA and bug fix

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
