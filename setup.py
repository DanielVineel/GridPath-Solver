from setuptools import setup, find_packages

setup(
    name="gridpath-solver",
    version="0.1.0",
    author="G Daniel Vineel",
    packages=find_packages(),
    include_package_data=True,   
    install_requires=["flask"],
)