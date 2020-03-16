export const figuredNumber = (figure, chr) => {
    let result = ''
    if (figure == 'round') {
        var condition = {
            1 : '①',
            2 : '②',
            3 : '③',
            4 : '④'
        }
        result = condition[chr]
    }
    return result
}