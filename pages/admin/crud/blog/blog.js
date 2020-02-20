import Layout from '../../../../components/Layout'
import Admin from '../../../../components/auth/Admin'
import BlogCreate from '../../../../components/crud/BlogCreate'
import Link from 'next/link'

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="col-md-12 pt-5 pb-5">
                        <h2>Creare articol</h2>
                    </div>
                    <div className="row">

                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog