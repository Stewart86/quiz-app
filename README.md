# Quiz App Guide

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## User Management

1. Admin and Tutor role can exist in a single account together
2. Being as a Admin or Tutor role will remove student and trial role
3. a user can only be either trial or student not both
4. upgrading to admin and / or tutor will remove student / trial role
5. disabling an account will automatically default user to trial role and disable
6. re-enabling user will start from trial role
7. IMPORTANT! you can disable yourself as an admin (a backup admin account will prevent accidental lock out)
8. a reminder will show below the page when due date is lesser than 7 days

## RBCA flow

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

## Testing

- add function trial to tutor
- add function trial to student
- student list
- student to tutor
- tutor list
- convert admin page to tutor page
- convert manage page to admin page
- admin page nav bar missing
- admin table actions column unable to click
- multiple selection not triggering multiple delete
- topic once selected unable to change
- admin should redirect to admin
- tutor should redirect to manage
- disabled user not doing anything
- delete /disable account
- admin page create button convert to fab
- renewal
- subscription
- add reminder at question sections
- redirect to renew / subscribe after due date

## To Do
- email varification
- reset password
- forget password

- change question selection
- stripe payment
- add createMUI theme

## bugs

## enhancement
- page transition is smooth
