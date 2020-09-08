# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

{
    'name': 'ERPLibre package survey',
    'version': '0.1',
    'author': "TechnoLibre",
    'website': 'https://technolibre.ca',
    'license': 'AGPL-3',
    'category': 'survey',
    'summary': 'INSTALL ERPLibre package survey',
    'description': """
ERPLibre package survey
=======================

""",
    'depends': [
        # Custom ERPLibre
        'erplibre_base',

        # addons/Numigi_odoo-survey-addons
        'survey_answer_for_partner',
        'survey_type',
    ],
    'data': [],
    'installable': True,
}
