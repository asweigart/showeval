"""
showeval.steps('2 + 2') returns
['2 + 2', '4']


"""

import ast


def steps(sourceCode):
    steps = []

    p = parenthesize(sourceCode)
    # TODO - finish

def parenthesize(sourceCode):
    return _evalNode(ast.parse(sourceCode).body[0].value)

def _evalNode(node):
    nodeType = str(node.__class__)[len("<class '_ast."):-2]

    if nodeType == 'Name':
        return '(%s)' % (node.id,)

    if nodeType == 'Num':
        return '(%s)' % (node.n)

    if nodeType in ('Str', 'Bytes'):
        return '(%s)' % (node.s)

    if nodeType == 'UnaryOp':
        return '(%s %s)' % (_evalNode(node.op), _evalNode(node.operand))

    if nodeType in ('UAdd', 'USub', 'Not', 'Invert'):
        return {'UAdd': '+', 'USub': '-', 'Not': 'not', 'Invert': '~'}[nodeType]

    if nodeType == 'BinOp':
        return '(%s %s %s)' % (_evalNode(node.left), _evalNode(node.op), _evalNode(node.right))

    if nodeType in ('Add', 'Sub', 'Mult', 'Div', 'FloorDiv', 'Mod', 'Pow',
                    'LShift', 'RShift', 'BitOr', 'BitXor', 'BitAnd'):
        return {'Add': '+', 'Sub': '-', 'Mult': '*', 'Div': '/',
                'FloorDiv': '//', 'Mod': '%', 'Pow': '**', 'LShift': '<<',
                'RShift': '>>', 'BitOr': '|', 'BitXor': '^', 'BitAnd': '&'}[nodeType]

    if nodeType == 'BoolOp':
        return '(%s)' % (_evalNode(node.op).join(node.values),)

    if nodeType in ('And', 'Or'):
        return {'And': 'and', 'Or': 'or'}[nodeType]

    if nodeType == 'Compare':
        return '(%s %s)' % (_evalNode(node.left), ' '.join([_evalNode(node.ops[i]) + ' ' + _evalNode(node.comparators[i]) for i in range(len(node.ops))]))

    if nodeType in ('Eq', 'NotEq', 'Lt', 'LtE', 'Gt', 'GtE', 'Is', 'IsNot', 'In', 'NotIn'):
        return {'Eq': '==', 'NotEq': '!=', 'Lt': '<', 'LtE':'<=', 'Gt': '>', 'GtE': '>=', 'Is': 'is', 'IsNot': 'is not', 'In':'in', 'NotIn': 'not in'}[nodeType]

