from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from core.models import Document


class Command(BaseCommand):
    help = "This command populates the database with default db"

    def create_document(self, filename, data, user):
        document = Document.objects.create(filename=filename, data=data, user=user)
        document.save()
        self.stdout.write(self.style.SUCCESS(f"Created document {document}"))
        return document

    def create_normal_user(self, email):
        user = get_user_model().objects.create_user(
            password="vandyhacks",
            email=email,
            email_verified=True,
        )
        user.save()
        self.stdout.write(self.style.SUCCESS(f"Created user {email}"))
        return user

    def create_super_user(self, email):
        user = get_user_model().objects.create_user(
            password="vandyhacks",
            email=email,
            email_verified=True,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save()
        self.stdout.write(self.style.SUCCESS(f"Created superuser {email}"))
        return user

    def handle(self, *_, **__):
        self.create_super_user("admin@example.com")
        user1 = self.create_normal_user("user1@example.com")
        user2 = self.create_normal_user("user2@example.com")

        self.create_document(
            "Aston Martin",
            """
             The Aston Martin Lagonda Taraf is a full-size luxury car that was produced in 2015 and 2016 by the British carmaker Aston Martin under its Lagonda marque. Designed by Marek Reichman and considered "the finest of fast cars" by Aston Martin,[4][5] the vehicle is based upon the vertical–horizontal platform, which it shares with the DB9 and Rapide. The Taraf debuted in Dubai in 2014, with manufacture commencing in the subsequent year at the facility in Gaydon, Warwickshire. Initially intended for sale exclusively in the Middle Eastern market with a limited run of 100 units, Aston Martin later expanded the car's availability to several other countries and ultimately built 120.
             The Taraf has a 0–100 km/h (0–62 mph) acceleration time of 4.4 seconds and a maximum speed of 314 km/h (195 mph). The car features Aston Martin's 5.9-litre engine and an eight-speed automatic transmission manufactured by ZF Friedrichshafen. At its launch, the Taraf was the most expensive saloon in the world, priced at over US$1 million. Car critics and reviewers mostly appreciated its handling ability but criticised its steep price. 
            """,
            user1,
        )

        self.create_document(
            "Wilson Square",
            """
            The square is named after Woodrow Wilson, who was the 28th president of the United States from 1913 to 1921. In his Fourteen Points, Wilson called for the establishment of an independent Poland. The full name of the square is Thomas Woodrow Wilson Square (Polish: Plac Thomasa Woodrowa Wilsona), although it is usually known simply as Wilson Square (Polish: Plac Wilsona).[1]
            It was originally named around 1923 as Stefan Żeromski Square (Polish: Plac Stefana Żeromskiego), after Stefan Żeromski, a 19th- and 20th-century novelist and dramatist.[2]
            On 27 September 1926, it was renamed to Thomas Woodrow Wilson Square.[1] The idea for the name originated on 21 February 1924, when, shortly after Wilson's death on 3 February 1926, the city council had decided to name a street, a city square, or an institution, after him.[3] 
            """,
            user1,
        )

        self.create_document(
            "ALTIUS",
            """
            ALTIUS (Atmospheric Limb Tracker for Investigation of the Upcoming Stratosphere) is a satellite mission proposed
            by the Belgian Institute for Space Aeronomy and currently under development by the European Space Agency.
            [3][4][5] Its main objective is to monitor the distribution and evolution of stratospheric ozone in the Earth's atmosphere.
            The industrial consortium is led by QinetiQ Space, acting as mission prime.[6][4]
            The satellite design is based on the PROBA small satellite bus.[3]
            The payload, developed by OIP Sensor Systems, is an innovative UV, visible and NIR instrument
            """,
            user2,
        )

        self.create_document(
            "The Double Florin",
            """
            The Double Florin is a 1924 thriller novel by John Rhode, the pen name of the British writer Cecil Street.[1] Like H.C. McNeile's Bulldog Drummond and Agatha Christie's The Secret Adversary the plot revolves around a Bolshevik conspiracy to destroy capitalism and western democracy.[2] The title refers to the Double florin coin.
            It was his second published novel and anticipated the introduction of his best-known character Dr. Priestley in his following book The Paddington Mystery. The conspiracy is being directed by Professor Sanderson, a brilliant mathematician.[3] Sanderson is not himself a communist, but is manipulating the organisation to try and create a new order based on pure reason.[4] 
            """,
            user2,
        )
