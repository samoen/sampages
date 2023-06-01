// import svelteicon from "$lib/assets/svelte-icon.png"
// import { browser } from "$app/environment";


// export const load = async ({ url }) => {
//     if(browser){
//         let p = new Promise((resolve)=>{
//             const img = new Image();
//             img.src = svelteicon;
//             img.onload = ()=>{
//                 resolve(1)
//             }
//         })
//         await p;
        
//     }
//     return {
//         options:{
//             maxAge:9999
//         }
//     }
//   }