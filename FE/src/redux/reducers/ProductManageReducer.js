import { SET_LIST_PRODUCT } from "../types/ProductManageType"



const stateDefault = {
    arrProduct: [
        {
            "maPhim": 9590,
            "tenPhim": "Guardians of the Galaxy 1",
            "biDanh": "guardians-of-the-galaxy-1",
            "trailer": "https://www.youtube.com/embed/2LIQ2-PZBC8",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/guardians-of-the-galaxy-1-2014-_gp00.jpg",
            "moTa": "Năm 1980, sau khi mẹ qua đời, Peter Quill bị bắt khỏi Tr&aacute;i đất bởi Tộc Yondu Ravager, từ đ&oacute; anh trở th&agrave;nh đạo ch&iacute;ch với biệt danh Star-Lord. Quill t&igrave;m được một quả cầu, b&ecirc;n trong l&agrave; Vi&ecirc;n đ&aacute; Sức mạnh, nhưng rồi anh lại bị bắt ở h&agrave;nh tinh Xandar của Nova Corps. Tại đ&oacute; Quill gặp Gamora, Rocket Racoon, Groot, Drax v&agrave; c&ugrave;ng tho&aacute;t ra. Họ c&ugrave;ng nhau ngăn cản &acirc;m mưu của t&ecirc;n chiến binh Kree l&agrave; Ronan, kẻ muốn d&ugrave;ng quả cầu để hủy diệt Xandar.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2022-03-24T00:00:00",
            "danhGia": 6,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        },
        {
            "maPhim": 9592,
            "tenPhim": "Avengers: Age of Ultron (2022)",
            "biDanh": "avengers-age-of-ultron-2022-",
            "trailer": "https://www.youtube.com/embed/tmeOjFno6Do",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/avengers-age-of-ultron-2015-_gp00.jpg",
            "moTa": "Sau sự kiện ở Captain America 2021: The Winter Soldier c&aacute;c Avengers tập hợp c&ugrave;ng nhau để ti&ecirc;u diệt t&agrave;n dư Hydra. Nh&oacute;m thu giữ được c&acirc;y trượng của Loki với Vi&ecirc;n đ&aacute; T&acirc;m tr&iacute;, Tony t&iacute;nh d&ugrave;ng sức mạnh của vi&ecirc;n đ&aacute; để bảo vệ nền h&ograve;a b&igrave;nh Tr&aacute;i đất nhưng v&ocirc; t&igrave;nh tạo ra Ultron, một thực thể t&agrave;n &aacute;c với &yacute; định hủy diệt thế giới. Nh&oacute;m Avenger lại c&ugrave;ng nhau hợp sức bảo vệ thế giới v&agrave; đ&aacute;nh bại kẻ th&ugrave; mới n&agrave;y",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2022-03-28T09:50:41.32",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
          },
    ]
}
export const ProductManageReducer = (state=stateDefault, action) => {
    switch(action.type){
        case SET_LIST_PRODUCT:{
            state.arrProduct = action.arrProduct;
            return {...state}
        }
        default : return {...state}
    }
}