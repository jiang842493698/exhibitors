

class wxService {
    showModal(options) {
        options = Object.assign({
            title: '',
            content: '',
            confirmColor: '#6288d5'
        }, options);
        wx.showModal(options);
    }
}
export default wxService;