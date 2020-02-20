import Layout from '../../../../components/Layout'
import Admin from '../../../../components/auth/Admin'
import ProductUpdate from '../../../../components/crud/ProductUpdate'
import Link from 'next/link'

const Product = () => {



    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="col-md-12 pt-5 pb-5">
                        <h2>Update Product</h2>
                    </div>
                    <div className="row">

                        <div className="col-md-12">
                            <ProductUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Product