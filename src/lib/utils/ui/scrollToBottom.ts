const scrollToBottom = async (node : HTMLElement) => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' })
}

export default scrollToBottom