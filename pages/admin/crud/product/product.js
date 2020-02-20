import Layout from '../../../../components/Layout';
import Admin from '../../../../components/auth/Admin';
import ProductCreate from '../../../../components/crud/ProductCreate';
import Link from 'next/link';

const Product = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="col-md-12 pt-5 pb-5">
						<h2>Creare produs</h2>
					</div>
					<div className="row">
						<div className="col-md-12">
							<ProductCreate />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	);
};

export default Product;
