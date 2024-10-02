// import * as NavigationMenu from "@radix-ui/react-navigation-menu";
// import { ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";
// import { ROUTES } from "../constants/routes";

// function NavMenu() {
//   return (
//     <NavigationMenu.Root className="flex  justify-center z-[1] relative">
//       <NavigationMenu.List className="center shadow-black m-0 flex list-none rounded-[6px] bg-white p-1 ">
//         <NavigationMenu.Item>
//           <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] ">
//             Nosotros{" "}
//             <ChevronDown
//               className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
//               aria-hidden
//             />
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content className="absolute top-0 left-0 w-full bg-blue-500 sm:w-auto">
//             <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
//               <li className=" hover:bg-red-500">
//                 <NavigationMenu.Link asChild>
//                   <Link
//                     className="focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors"
//                     to={ROUTES.HOMEPAGE}
//                   >
//                     <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">
//                       Titulo 1
//                     </div>
//                     <p className="text-mauve11 leading-[1.4]">concepto 1</p>
//                   </Link>
//                 </NavigationMenu.Link>
//               </li>
//               <li className=" hover:bg-red-500">
//                 <NavigationMenu.Link asChild>
//                   <Link to={"/aca"}>¿Porque donar en Smile?</Link>
//                 </NavigationMenu.Link>
//               </li>
//             </ul>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
//           <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
//         </NavigationMenu.Indicator>
//       </NavigationMenu.List>

//       <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
//         <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
//       </div>
//     </NavigationMenu.Root>
//   );
// }

// export default NavMenu;
