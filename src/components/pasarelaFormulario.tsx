// function PasarelaFormulario({ correo }: { correo: string }) {
//   return (
//     <div className="px-10">
//       <div className="space-y-6">
//         <div className="border-b border-gray-900/10 pb-6">
//           <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
//             <div className="col-span-3 sm:col-span-full">
//               <label
//                 htmlFor="mail"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Correo
//               </label>
//               <div className="mt-2">
//                 <input
//                   {...register("mail")}
//                   id="mail"
//                   name="mail"
//                   defaultValue={correo}
//                   className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div className="col-span-full">
//               <label
//                 htmlFor="nombres"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Nombres
//               </label>
//               <div className="mt-2">
//                 <input
//                   {...register("nombres")}
//                   id="nombres"
//                   name="nombres"
//                   className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className=" pb-12">
//           <div className=" grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
//             <div className="col-span-3 sm:col-span-full ">
//               <label
//                 htmlFor="tarjeta"
//                 className="block text-sm font-medium leading-6 text-gray-900 sr-only"
//               >
//                 Número de Tarjeta
//               </label>
//               <div className="mt-2">
//                 <input
//                   {...register("tarjeta")}
//                   type="text"
//                   name="tarjeta"
//                   id="tarjeta"
//                   placeholder="Número de Tarjeta"
//                   autoComplete="given-name"
//                   className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div className="col-span-3">
//               <label
//                 htmlFor="vencimiento"
//                 className="block text-sm font-medium leading-6 text-gray-900 sr-only"
//               >
//                 vencimiento
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="vencimiento"
//                   name="vencimiento"
//                   placeholder="MM / AA"
//                   className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div className="col-span-3">
//               <label
//                 htmlFor="codigo-acceso"
//                 className="block text-sm font-medium leading-6 text-gray-900 sr-only"
//               >
//                 codigo-acceso
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="codigo-acceso"
//                   name="codigo-acceso"
//                   placeholder="CVV"
//                   className="block w-full rounded-xl border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PasarelaFormulario;
