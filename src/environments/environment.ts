// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAE-99lE4bd_NBOq-vqIq4vBdLGOZ8Whqg',
    authDomain: 'project-for-studies.firebaseapp.com',
    databaseURL: 'https://project-for-studies.firebaseio.com',
    projectId: 'project-for-studies',
    storageBucket: 'project-for-studies.appspot.com',
    messagingSenderId: '891204693086'
  }
};
