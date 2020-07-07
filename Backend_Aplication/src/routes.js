import { Router } from 'express';
import multer from 'multer';
import redis from 'redis';
import ExpressBruteFlexible from 'rate-limiter-flexible/lib/ExpressBruteFlexible';

import Cache from './lib/Cache';

import multerConfig from './config/multer';

// controllers

import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import AdminSessionController from './app/controllers/AdminSessionController';
import FileController from './app/controllers/FileController';
import CategoryController from './app/controllers/CategoryController';
import BannerController from './app/controllers/BannerController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';
import UserOrderController from './app/controllers/UserOrderController';
import OfferController from './app/controllers/OfferController';
import SettingController from './app/controllers/SettingController';
import ProductDetails from './app/controllers/ProductDetailsController';
import CategoriaDetails from './app/controllers/CategoriaDetailsController';
import StatusPedidoControllers from './app/controllers/StatusPedidoControllers';
import ProductListControllers from './app/controllers/ProductListController';
import RelatorioPedidosData from './app/controllers/RelatorioPedidosDataControlers';
import FreteController from './app/controllers/FreteController';
import VariacaoControllers from './app/controllers/VariacaoController';
import OpcaoControllers from './app/controllers/OpcaoController';
import EstabelecimentoControllers from './app/controllers/EstabelecimentoController';
import SessionEstabelecimentoController from './app/controllers/SessionEstabelecimentoController';
import OfertasEstabelecimento from './app/controllers/ControllersMobile/OfertasestabelecimentoControllers';
import CategoriasEstabelecimento from './app/controllers/ControllersMobile/CategoriaestabelecimentoControllers';
import ProductEstabelecimento from './app/controllers/ControllersMobile/ProductEstabelecimentoController';
import AddressesUserEstab from './app/controllers/ControllersMobile/AdressesUserLogadoController';
import OfertasGeral from './app/controllers/ControllersMobile/ListaOfertasGeralControllers';
import VariacaoProduto from './app/controllers/ControllersMobile/VariacaoProdutoControllers';
import OpcaoVariacaoEstabControllers from './app/controllers/ControllersMobile/OpcaoVariacaoEstabControllers';
import ListAdressesPorId from './app/controllers/ControllersMobile/ListAdressesPorIdController';
import OrderUserControllers from './app/controllers/ControllersMobile/OrderUsersControllers';
import BuscarPorCategoria from './app/controllers/ControllersMobile/BuscarEstabelecimentoCategoriaControllers';

import TotalCancelados from './app/controllers/ControllerRelatorios/TotalCancelado';
import TotalCartao from './app/controllers/ControllerRelatorios/TotalCartão';
import TotalDinheiro from './app/controllers/ControllerRelatorios/TotalDinheiro';
import Totalentregues from './app/controllers/ControllerRelatorios/TotalEntregues';
import TotalPedidos from './app/controllers/ControllerRelatorios/TotalPedidos';
import totalPendentes from './app/controllers/ControllerRelatorios/TotalPendentes';
import ValorTotal from './app/controllers/ControllerRelatorios/ValorTotalPedidos';
import FaturamentoTotal from './app/controllers/ControllerRelatorios/FaturamentoTotal';

// listar produtos e categorias por id para o painel web
import ListProductEdit from './app/controllers/ControllersEditsProductsCategoria/ListProductIds';
import ListCategoriaEdit from './app/controllers/ControllersEditsProductsCategoria/ListCategoriaIds';
import ListVariacaoEdit from './app/controllers/ControllersEditsProductsCategoria/ListVariacaoId';
import ListOpcaoEdit from './app/controllers/ControllersEditsProductsCategoria/ListOpcaoIds';
// coontrollers do adminstrador
import OrderControllerAdmins from './app/controllers/ControllersAdmins/OrderController';
// validators

import validateCategoryStore from './app/validators/CategoryStore';
import validateOfferStore from './app/validators/OfferStore';
import validateOfferUpdate from './app/validators/OfferUpdate';
import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateProductStore from './app/validators/ProductStore';
import validateProductUpdate from './app/validators/ProductUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateAddressStore from './app/validators/AddressStore';
import validateAddressUpdate from './app/validators/AddressUpdate';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateVariacaoStore from './app/validators/VariacaoStore';

// middlewares

import authMiddlewareUsers from './app/middlewares/auth';
import authMiddleware from './app/middlewares/authEstabelecimento';

// configs

const routes = new Router();
const upload = multer(multerConfig);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new ExpressBruteFlexible(
  ExpressBruteFlexible.LIMITER_TYPES.REDIS,
  {
    freeRetries: 100,
    storeClient: redisClient,
  },
);

// routes
// routes do administrador
routes.get('/OrderAdmin', OrderControllerAdmins.index);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/estabelecimento', EstabelecimentoControllers.store);
routes.put('/estabelecimento', EstabelecimentoControllers.update);

routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store,
);
routes.post(
  '/sessionsEstabelecimento',
  bruteForce.prevent,
  validateSessionStore,
  SessionEstabelecimentoController.store,
);

routes.post(
  '/admin/sessions',
  bruteForce.prevent,
  validateSessionStore,
  AdminSessionController.store,
);

routes.get('/users', authMiddlewareUsers, UserController.index);
routes.put(
  '/users',
  authMiddlewareUsers,
  validateUserUpdate,
  UserController.update,
);
routes.post(
  '/address',
  authMiddlewareUsers,
  validateAddressStore,
  AddressController.store,
);

routes.get('/address', authMiddlewareUsers, AddressController.index);
// buscar um unico endereco por id
routes.get('/addressUser/:id', ListAdressesPorId.index);
// buscar todos enderecos do usuario logado por id
routes.get('/address_estab/:id', AddressesUserEstab.index);
// excluir um endereco do usuario logado no app
routes.delete('/address_estab/:id', AddressesUserEstab.delete);
// atualiza um endereco do usuario logado no app
routes.put('/address_estab/:id', AddressesUserEstab.update);
// cadastra um endereco do usuario logado no app
routes.post('/address_estab', AddressesUserEstab.store);
routes.put(
  '/address',
  authMiddlewareUsers,
  validateAddressUpdate,
  AddressController.update,
);
// buscar estabelecimento por categoria e pesquisar por nome
routes.get('/buscarestabelecimento', BuscarPorCategoria.index);
// buscar pedido por cliente logado no app
routes.get('/orders_user/:id', OrderUserControllers.index);
// lista todas ofertas de todos estabelecimento
routes.get('/offersGeral', OfertasGeral.index);
// lista todas variacoes por produto passando o id do produto
routes.get('/variacao_produto/:id', VariacaoProduto.index);
// lista todas as opcoes das variacoes passando o id da variacao
routes.get('/opcao_variacao/:id', OpcaoVariacaoEstabControllers.index);

routes.use(authMiddleware);

routes.put('/estabelecimento', EstabelecimentoControllers.update);

routes.post('/admins', AdminController.store);
routes.get('/admins', AdminController.index);
routes.delete('/admins/:id', AdminController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/banners', BannerController.store);
routes.get('/banners', BannerController.index);
routes.delete('/banners/:id', BannerController.delete);

routes.post('/categories', validateCategoryStore, CategoryController.store);
routes.get('/categories_estab/:id', CategoriasEstabelecimento.index);
routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoriaDetails.index);
routes.delete('/categories/:id', CategoryController.delete);
routes.put('/categories/:id', CategoryController.update);
// Listar categoria por id p/editar painel web
routes.get('/categorialist/:id', ListCategoriaEdit.index);

routes.get('/estabelecimento', EstabelecimentoControllers.index);
// routes.delete('/estabelecimento/:id', EstabelecimentoControllers.delete);
routes.put('/estabelecimento/:id', EstabelecimentoControllers.update);

routes.post('/products', validateProductStore, ProductController.store);
routes.get('/products', ProductController.index);
routes.get('/productsCategorias/:id', ProductEstabelecimento.index);
routes.get('/productsList', ProductListControllers.index);
routes.get('/products/:id', ProductDetails.index);
routes.delete('/products/:id', ProductController.delete);
routes.put('/products/:id', validateProductUpdate, ProductController.update);
// Listar product por id p/editar painel web
routes.get('/productslist/:id', ListProductEdit.index);

routes.post('/orders', validateOrderStore, OrderController.store);
routes.get('/orders', OrderController.index);
routes.get('/orders/:id', UserOrderController.index);
routes.get('/status/:id', StatusPedidoControllers.index);
routes.put('/orders/:id', validateOrderUpdate, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.post('/offers', validateOfferStore, OfferController.store);
routes.get('/offer_estab/:id', OfertasEstabelecimento.index);
routes.get('/offers', OfferController.index);
routes.put('/offers/:id', validateOfferUpdate, OfferController.update);
routes.delete('/offers/:id', OfferController.delete);
// relatorio dos pedidos por dia do estabelecimento
routes.get('/relatoriopedidos', RelatorioPedidosData.index);
routes.get('/totalCancelado', TotalCancelados.index);
routes.get('/totalCartao', TotalCartao.index);
routes.get('/totalDinheiro', TotalDinheiro.index);
routes.get('/totalEntregue', Totalentregues.index);
routes.get('/totalPedido', TotalPedidos.index);
routes.get('/totalPendente', totalPendentes.index);
routes.get('/valorTotal', ValorTotal.index);
routes.get('/faturamentoTotal', FaturamentoTotal.index);

routes.post('/settings', SettingController.store);
routes.get('/settings', SettingController.index);
routes.put('/settings', SettingController.update);

routes.post('/frete', FreteController.store);
routes.get('/frete', FreteController.index);
routes.put('/frete/:id', FreteController.update);
routes.delete('/frete/:id', FreteController.delete);

routes.post('/variacao', validateVariacaoStore, VariacaoControllers.store);
routes.get('/variacao', VariacaoControllers.index);
routes.put('/variacao/:id', VariacaoControllers.update);
routes.delete('/variacao/:id', VariacaoControllers.delete);
// Listar variacao por id p/editar painel web
routes.get('/variacaoedit/:id', ListVariacaoEdit.index);

routes.post('/opcaovariacao', OpcaoControllers.store);
routes.get('/opcaovariacao', OpcaoControllers.index);
routes.put('/opcaovariacao/:id', OpcaoControllers.update);
routes.delete('/opcaovariacao/:id', OpcaoControllers.delete);

routes.get('/listOpcao/:id', ListOpcaoEdit.index);

routes.get('/invalidate/all', async (req, res) => {
  await Cache.invalidateAll();
  return res.json('Cache limpo!');
});

export default routes;
