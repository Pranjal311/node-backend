
// // resolves all the modules
// import 'module-alias/register';

// if (!process.env.NODE_ENV) { console.error("ERROR: No Node Environment defined"); process.exit(100); }


// import { Helper } from '../helper.service';
// import * as Seeder from "./seeder.bootstrap";



// //console.log("dir name==>",path.join(process.cwd(),"/bin/.env.local"));

// export const bootstrapStatus = {

//     /** create directory - specify list of directories */
//     createDirectory: Helper.createNewDirectory('bin'),

//     /** check if `.env` files exists */
//     environmentCheck: Helper.checkFileExists(`/.env.${process.env.NODE_ENV}`),

//     /** creates admins */
//     createStaticContent:Seeder.createStaticContent(),

// };

// //console.clear();
// console.log('~~~ Initiating Bootstrapping ~~~\n');
// console.log(`1. Create Required Directories: ${bootstrapStatus.createDirectory ? '✔' : '❌'}`);
// console.log(`2. Environment File Exists: ${bootstrapStatus.environmentCheck ? '✔' : '❌'}`);
// //console.log(`3. Admin Exists: ${bootstrapStatus.createAdmin ? '✔' : '❌'}`);
// console.log('\n~~~ Completed Bootstrapping ~~~\n');