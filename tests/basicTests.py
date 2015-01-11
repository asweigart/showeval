import unittest
import sys
import os

sys.path.insert(0, os.path.abspath('..'))
import showeval

class TestBasics(unittest.TestCase):
    def test_basicmath(self):
        self.assertEqual(showeval.steps('2 + 2'),    ['2 + 2', '4'])
        self.assertEqual(showeval.steps('2 +    2'), ['2 +    2', '4'])
        self.assertEqual(showeval.steps('2 + 2 + 3'), ['2 + 2 + 3', '4 + 3', '7'])

if __name__ == '__main__':
    unittest.main()
