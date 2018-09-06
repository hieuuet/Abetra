import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native'
const AppHelper = {
    resizeImage: function (image_width, image_height, imageWidth) {
        var imageSize = {
            width: imageWidth,
            height: (imageWidth * image_height) / image_width
        }
        return imageSize;
    }
}

export default class Test extends Component {



    getImageSize(imageURL) {
        Image.getSize(imageURL, (srcWidth, srcHeight) => {
            let imageSize = {
                width: srcWidth,
                height: srcHeight
            }
            return imageSize
        }, error => {
            console.log('error:', error);
        });
    }
    getImageStaticSize(imageURL) {
        let _imageSize = resolveAssetSource(imageURL)
        if (!this.isNullOrEmpty(_imageSize)) {
            let imageSize = {
                width: _imageSize.width,
                height: _imageSize.height
            }
            return imageSize
        }
        return {}
    }
    render (){
        return (
            <View>
                <Text>Chủ đề đang hot!
                    Có bài viết này thấy hay mình xin trích lại, share với mọi người cùng đọc:

                    NGÔN NGỮ HỌC LÀ KÝ HIỆU HỌC?

                    Ai mà tin rằng sắp tới, sau cải cách giáo dục, học sinh thay vì viết chữ quốc ngữ thì sẽ viết những ô vuông, ô tròn này thì mình cũng chịu các bạn =))))) Ko hiểu sao các bạn lại có cái NIỀM TIN MÃNH LIỆT như vậy )

                    Thứ nhất, đây là cách thức để giúp các em học sinh tiểu học học TIẾNG, chứ không phải học CHỮ. Tức là, trước khi học chữ, cần phải nhận biết xem một câu có bao nhiêu tiếng, và những ô tròn ô vuông kia chỉ là để minh họa một cách trực quan cho việc nhận biết số lượng tiếng trong 1 dòng hoặc 1 câu, chứ không đời nào và không bao giờ chữ quốc ngữ lại biến thành mấy cái ô tròn ô vuông ô tam giác cả =)))))

                    Thứ hai, dưới khía cạnh khoa học, ngôn ngữ là MỘT HỆ THỐNG KÝ HIỆU CÓ CHỨC NĂNG BIỂU ĐẠT THÔNG TIN VÀ PHẢN ÁNH TƯ DUY CỦA CON NGƯỜI. Mà một khi đã là ký hiệu dùng để biểu đạt thông tin, thì chắc chắn với những thông tin có nội dung khác nhau, ký hiệu biểu đạt chúng cũng khác nhau. Ví dụ các bạn muốn biểu đạt "3 que" và "con người" thì chắc chắn các bạn phải sử dụng những ký hiệu khác nhau chứ không thể sử dụng cùng 1 tổ hợp ký hiệu giống nhau y hệt. Chính vì vậy, những ô vuông ô tròn kia chỉ là để minh họa cho các tiếng và số lượng các tiếng giúp học sinh nhận biết các tiếng trước khi học chữ, CHỨ SẼ KHÔNG BAO GIỜ TRỞ THÀNH 1 HỆ THỐNG KÝ HIỆU ĐỂ THAY THẾ CHỮ QUỐC NGỮ ĐƯỢC VÌ NÓ KHÔNG CÓ KHẢ NĂNG BIỂU ĐẠT THÔNG TIN, KHÔNG CÓ KHẢ NĂNG PHẢN ÁNH VÀ DIỄN ĐẠT TƯ DUY CỦA CON NGƯỜI TRONG XÃ HỘI HIỆN ĐẠI.

                    Thứ ba, theo quan điểm của triết học Mác - Lênin, ngôn ngữ được coi là cái vỏ vật chất của tư duy. Con người tư duy như nào, thì sẽ thể hiện ra bằng ngôn ngữ như vậy. Tư duy kiểu sử dụng các hình khối (vuông, tròn, tam giác) là loại tư duy trực quan sinh động, đã bắt đầu xuất hiện từ rất lâu trong lịch sử loài người, gắn với sự phát triển của con người ở thời kỳ bình minh của nhân loại, khi mà con người chưa có chữ viết, chưa có tư duy trừu tượng. Khi xã hội ngày càng phát triển lên những thang bậc cao hơn, thì tư duy con người cũng có sự tiệm tiến và nâng dần từ trực quan sinh động đến tư duy trừu tượng. Quá trình chuyển biến từ trực quan sinh động đến tư duy trừu tượng không chỉ diễn ra trong lịch sử phát triển của nhân loại, mà còn diễn ra đối với sự phát triển tư duy của một con người, từ khi còn là đứa bé đến khi trở thành người trưởng thành, chín muồi cả về hình thể lẫn nhận thức. Và với các em học sinh tiểu học, khi tư duy của các em vẫn còn rất đơn giản, thì kiểu dạy trực quan sinh động, sử dụng các ô tròn, ô vuông, ô tam giác này là phương pháp giảng dạy tối ưu nhất... Chứ chẳng ai người ta mang lý luận ngôn ngữ, mang ký hiệu học, mang triết học Mác Lê ra dạy những đứa còn chưa biết đọc biết viết, biết nhận mặt chữ cả =)))))) Và xin nhấn mạnh lại đây là dạy TIẾNG, chứ không phải dạy CHỮ =)))) Là để các em nhận biết TIẾNG, chứ mấy cái ô này không dùng để thay thế chữ quốc ngữ.

                    Tôi tha thiết van nài những người chưa hiểu về vấn đề này, xin các anh chị đừng dạy khôn Bộ giáo dục, đừng dạy khôn ĐẠI Giáo sư Hồ Ngọc Đại. Thầy Đại không phải Giáo sư bình thường đâu, được giới chuyên môn coi là một giáo sư tầm cỡ trong những giáo sư tầm cỡ đấy =)))) Ba cái xu về ký hiệu học, về triết học ngôn ngữ tôi vừa nói bên trên chẳng đáng là 1 hạt bụi so với những cái Thầy Đại có trong đầu đâu. Đến tôi còn biết mấy cái rất cơ bản mà đơn giản này, thì quý vị yên tâm bộ giáo dục và Giáo sư Đại càng không bao giờ có ý định ngu dốt và hão huyền đến mức muốn biến chữ quốc ngữ thành hết ô vuông ô tròn ô tam giác =))))

                    Tạm kết

                    Hôm qua tôi có cmt tranh luận với 1 chị về vấn đề này, chị ấy bảo:
                    - Chị ấy: giờ cải cách cái kiểu gì mà cứ năm sau lại không đọc được chữ năm trước. Năm sau 1 kiểu chữ, năm trước 1 kiểu chữ
                    + Tôi: À, thế à? Thế mà tôi học qua mấy chục năm rồi, mà giờ tôi vẫn biết đọc biết viết, vẫn hiểu được chữ người khác viết gì, và người khác vẫn đọc được tôi viết gì. Thế chị có hiểu tôi đang viết gì không??? =)))))

                    P/s: Bạn nào chửi bới, phản biện gì mà nói những câu khó nghe, mình xin phép sẽ coi đó như những ô vuông, ô tròn, ô tam giác không có chức năng biểu đạt thông tin, và mình sẽ không trả lời =))))))</Text>
            </View>
        )
    }
}