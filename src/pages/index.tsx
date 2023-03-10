import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Table from '../pages/components/table'
import Content from '../pages/components/content'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
  {/* <Table/> */}
  <Content/>
    </>
  )
}
