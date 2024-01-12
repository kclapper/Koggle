export default function PageContent({ children }: { children: React.ReactNode }) {
  return <div className='container-lg px-4 px-lg-0 pt-4'>
           <div className='row justify-content-center'>
             <div className='col-lg-8'>
               { children }
             </div>
           </div>
         </div>
}
